import { XMLParser } from 'fast-xml-parser';

import { csvLineToArray, InvalidFile, parseDate, readFileAsync } from 'utils';
import Program, { ProgramRating } from './program';

export default class EPGParser {
  static parseXml(xml: string): Program[] {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      isArray: tag => tag === 'programme',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let document: Record<string, any>;
    try {
      document = parser.parse(xml);
    } catch (error) {
      throw new InvalidFile('Invalid XML');
    }
    /*
      <tv date="20220621115207">
        <channel id="59360">
            <display-name lang="pt">SBT - SÃO PAULO</display-name>
            <display-name lang="pt">SBT - SÃO PAULO</display-name>
        </channel>
        <programme channel="59360" stop="202206251200" start="202206250600">
            <title lang="pt">SABADO ANIMADO</title>
            <sub-title lang="pt"/>
            <desc lang="pt">Seu fim de semana começa com muito mais alegria no Sábado Animado. Os desenhos que fazem sucesso entre a garotada de todas as idades estão reunidos aqui.</desc>
            <length units="minutes">360</length>
            <rating>
                <value>L</value>
            </rating>
            <category lang="pt">0x2</category>
        </programme>
      </tv>
    */
    const content = document.tv;
    const programs = content.programme;

    return programs.map(program => {
      const title: string = program.title['#text'];
      const description: string = program.desc['#text'];
      const duration: number = Number(program.length['#text']) * 60;

      const rate = {
        '00': ProgramRating.RSC,
        '01': ProgramRating.RL,
        '02': ProgramRating.R10,
        '03': ProgramRating.R12,
        '04': ProgramRating.R14,
        '05': ProgramRating.R16,
        '06': ProgramRating.R18,
      };

      const rating: ProgramRating =
        rate[program.rating.value] ?? ProgramRating.RSC;

      // example -> "202206250600"
      const date = program.start;

      const startDateTime = parseDate(date, 'yyyyMMddHHmm');
      return new Program({
        title,
        description,
        startDateTime,
        duration,
        rating,
      });
    });
  }

  static parseCsv(csv: string): Program[] {
    const lines = csv.split('\n');
    const programs = lines.slice(1);

    /*
      "Event ID";"Audio number";"Copy control number";"Data contents number";"Broadcast starting date";"Broadcast starting time";"Duration";"Program title";"Program content";"Free CA mode";"video Component tag";"Stream_content + video component type";"Vido text";"audio component tag 1";"Steam content + audio component type 1";"audio multilingual flag 1";"audio main component flag 1";"audio quality indicator 1";"audio sampling rate 1";"main language code 1";"secondary language code 1";"audio text1 1";"audio text2 1";"audio stream type 1";"content_nibble_level_1 + content_nibble_level_2";"user_nibble";"degital recording control data all";"APS control all";"maximum bit rate all";"digital copy control type all";"digital copy component tag 1";"digital recording control data 1";"APS control 1";"maximum bit rate 1";"digital copy control type 1";"digital copy component tag 2";"digital recording control data 2";"APS control 2";"maximum bit rate 2";"digital copy control type 2";"data Component ID1";"entry component1";"selector byte1";"component ref1";"data contents text1";"group type";"Common service id";"Common event id";"series id";"repear label";"program patterm";"expire data";"episode number";"last episode number";"series name char";"extended_item_descriptor_char";"extended_item_char";"Country Code";"rating";"Image constration token";"Retention mode";" Retention state";" Encryption mode";" linkage transport stream id";" linkage original network id";" linkage service id";" linkage type";" any"
      4015;1;2;1;20220622;165500;010000;"VALE A PENA VER DE NOVO";"Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"VALE A PENA VER DE NOVO";"BRA";"0x03";0;0;0;0;;;;;
    */

    const firstLine = csvLineToArray(lines[0]);
    if (!firstLine) {
      throw new InvalidFile('Invalid CSV');
    }

    return programs.map(prog => {
      const p = csvLineToArray(prog);
      if (p?.length !== firstLine.length) {
        throw new InvalidFile('Invalid CSV');
      }

      const [dateStr, timeStr, durationStr] = p.slice(4);

      const startDateTime = parseDate(dateStr + timeStr, 'yyyyMMddHHmmss');

      const h = Number(durationStr.substring(0, 2));
      const min = Number(durationStr.substring(2, 4));
      const sec = Number(durationStr.substring(4, 6));
      const duration = h * 3600 + min * 60 + sec;

      const title = p[7].replace(/['"]+/g, '');
      const description = p[8].replace(/['"]+/g, '');

      const rate = {
        0b0001: ProgramRating.RL,
        0b0010: ProgramRating.R10,
        0b0011: ProgramRating.R12,
        0b0100: ProgramRating.R14,
        0b0101: ProgramRating.R16,
        0b0110: ProgramRating.R18,
      };

      const ratingStr = p[58];

      const hex2bin = data =>
        data
          .slice(3, 5)
          .split('')
          .map(i => parseInt(i, 16).toString(2).padStart(4, '0'))
          .join('');

      const base = '0b';
      const brate = base.concat(hex2bin(ratingStr));
      const rating: ProgramRating = rate[Number(brate)];

      return new Program({
        title,
        description,
        startDateTime,
        duration,
        rating,
      });
    });
  }

  static async parseFile(file: File): Promise<Program[]> {
    const content = await readFileAsync(file);
    try {
      return this.parseCsv(content.trim());
    } catch (error) {
      if (error instanceof InvalidFile) {
        return this.parseXml(content);
      }
      throw error;
    }
  }
}
