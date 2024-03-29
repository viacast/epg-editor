import { XMLParser } from 'fast-xml-parser';

import {
  csvLineToArray,
  InvalidFile,
  parseDate,
  readFileAsync,
  getProgramTime,
  yyyyMMddHHmmToDuration,
} from 'utils';
import Program, {
  ProgramCategory,
  ProgramContent,
  ProgramRating,
} from './program';

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
    const data = document.tv;
    const programs = data.programme;
    return programs.map(program => {
      let title = '';
      let description = '';
      let duration = 0;
      if (program.title['#text']) {
        title = program.title['#text'];
        description = program.desc['#text'];
        duration = getProgramTime(program);
      } else {
        title = program.title;
        description = program.desc;
        duration = getProgramTime(program);
      }

      const rate = {
        '00': ProgramRating.RSC,
        '01': ProgramRating.RL,
        '02': ProgramRating.R10,
        '03': ProgramRating.R12,
        '04': ProgramRating.R14,
        '05': ProgramRating.R16,
        '06': ProgramRating.R18,
      };

      const contentp = {
        '00': '',
        '01': 'Drugs',
        '02': 'Violence',
        '03': 'Sex',
        '04': 'Drugs and Violence',
        '05': 'Drugs and Sex',
        '06': 'Violence and Sex',
        '07': 'Drugs, Violence and Sex',
      };

      const categoryp = {
        '0x0': 'Jornalismo',
        '0x1': 'Esporte',
        '0x2': 'Educativo',
        '0x3': 'Novela',
        '0x4': 'Minissérie',
        '0x5': 'Série/seriado',
        '0x6': 'Variedade',
        '0x7': 'Reality show',
        '0x8': 'Informação',
        '0x9': 'Humorístico',
        '0xA': 'Infantil',
        '0xB': 'Erótico',
        '0xC': 'Filme',
        '0xD': 'Sorteio, televendas, premiação',
        '0xE': 'Debate/entrevista',
        '0xF': 'Outros',
      };

      const subcat = {
        '0x00': 'Telejornais',
        '0x01': 'Reportagem',
        '0x02': 'Documentário',
        '0x03': 'Biografia',
        '0x10': 'Esporte',
        '0x20': 'Educativo',
        '0x30': 'Novela',
        '0x40': 'Minissérie',
        '0x50': 'Série',
        '0x60': 'Auditório',
        '0x61': 'Show',
        '0x62': 'Musical',
        '0x63': 'Making of',
        '0x64': 'Feminino',
        '0x65': 'Game Show',
        '0x70': 'Reality show',
        '0x80': 'Culinária',
        '0x81': 'Moda',
        '0x82': 'Rural',
        '0x83': 'Saúde',
        '0x84': 'Turismo',
        '0x90': 'Humorístico',
        '0xA0': 'Infantil',
        '0xB0': 'Erótico',
        '0xC0': 'Filme',
        '0xD0': 'Sorteio',
        '0xD1': 'Televendas',
        '0xD2': 'Premiação',
        '0xE0': 'Debate',
        '0xE1': 'Entrevista',
        '0xF0': 'Desenho adulto',
        '0xF1': 'Interativo',
        '0xF2': 'Político',
        '0xF3': 'Religioso',
        '0xFF': 'Outros',
      };

      let hex = program.category;
      if (typeof hex === 'object') {
        hex = program.category['#text'].toString(16).toUpperCase();
      } else {
        hex = program.category.toString(16).toUpperCase();
      }

      if (hex.length === 1) {
        hex += '0';
      }

      const category =
        categoryp[`0x${hex.slice(0, -1)}`] ?? ProgramCategory['0xF'];

      const subcategory = subcat[`0x${hex}`] ?? 'Outros';

      function pad(str, max) {
        return str.length < max ? pad(`0${str}`, max) : str;
      }

      const r: string = program.rating.value.toString();
      let rating;
      let content;

      if (program.rating.value > 10) {
        rating = rate[`${pad(r[1], 2)}`] ?? ProgramRating.RSC;
        content = contentp[`${pad(r[0], 2)}`] ?? ProgramContent.F;
      } else {
        rating = rate[`${pad(r, 2)}`] ?? ProgramRating.RSC;
        content = ProgramContent.F;
      }

      // example -> "202206250600"
      const date = program.start;

      // const startDateTime = parseDate(date, 'yyyyMMddHHmm');
      const startDateTime = yyyyMMddHHmmToDuration(date);

      return new Program({
        title,
        description,
        startDateTime,
        duration,
        content,
        rating,
        category,
        subcategory,
      });
    });
  }

  static parseCsv(csv: string): Program[] {
    const lines = csvLineToArray(csv);
    // const lines = csv.split('\n');
    const programs = lines.slice(1);

    /*
      "Event ID";"Audio number";"Copy control number";"Data contents number";"Broadcast starting date";"Broadcast starting time";"Duration";"Program title";"Program content";"Free CA mode";"video Component tag";"Stream_content + video component type";"Vido text";"audio component tag 1";"Steam content + audio component type 1";"audio multilingual flag 1";"audio main component flag 1";"audio quality indicator 1";"audio sampling rate 1";"main language code 1";"secondary language code 1";"audio text1 1";"audio text2 1";"audio stream type 1";"content_nibble_level_1 + content_nibble_level_2";"user_nibble";"degital recording control data all";"APS control all";"maximum bit rate all";"digital copy control type all";"digital copy component tag 1";"digital recording control data 1";"APS control 1";"maximum bit rate 1";"digital copy control type 1";"digital copy component tag 2";"digital recording control data 2";"APS control 2";"maximum bit rate 2";"digital copy control type 2";"data Component ID1";"entry component1";"selector byte1";"component ref1";"data contents text1";"group type";"Common service id";"Common event id";"series id";"repear label";"program patterm";"expire data";"episode number";"last episode number";"series name char";"extended_item_descriptor_char";"extended_item_char";"Country Code";"rating";"Image constration token";"Retention mode";" Retention state";" Encryption mode";" linkage transport stream id";" linkage original network id";" linkage service id";" linkage type";" any"
      4015;1;2;1;20220622;165500;010000;"VALE A PENA VER DE NOVO";"Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"VALE A PENA VER DE NOVO";"BRA";"0x03";0;0;0;0;;;;;
    */

    const firstLine = lines[0];
    if (!firstLine) {
      throw new InvalidFile('Invalid CSV');
    }

    return programs.map(prog => {
      if (prog.length !== firstLine.length) {
        throw new InvalidFile('Invalid CSV');
      }

      const dateStr = prog[firstLine.indexOf('Broadcast starting date')];
      let timeStr = prog[firstLine.indexOf('Broadcast starting time')];
      const durationStr = prog[firstLine.indexOf('Duration')];

      if (timeStr.length < 6) {
        timeStr += '00';
      }

      const startDateTime = parseDate(dateStr + timeStr, 'yyyyMMddHHmmss');

      const h = Number(durationStr.substring(0, 2));
      const min = Number(durationStr.substring(2, 4));
      const sec = Number(durationStr.substring(4, 6));
      const duration = h * 3600 + min * 60 + sec;

      const title = prog[firstLine.indexOf('Program title')].replace(
        /['"]+/g,
        '',
      );
      const description = prog[firstLine.indexOf('Program content')].replace(
        /['"]+/g,
        '',
      );

      const rate = {
        0b0001: ProgramRating.RL,
        0b0010: ProgramRating.R10,
        0b0011: ProgramRating.R12,
        0b0100: ProgramRating.R14,
        0b0101: ProgramRating.R16,
        0b0110: ProgramRating.R18,
      };

      const contentp = {
        0b0001: 'Drugs',
        0b0010: 'Violence',
        0b0100: 'Sex',
        0b0011: 'Drugs and Violence',
        0b0101: 'Drugs and Sex',
        0b0110: 'Violence and Sex',
        0b0111: 'Drugs, Violence and Sex',
      };

      const categoryp = {
        '0x0': 'Jornalismo',
        '0x1': 'Esporte',
        '0x2': 'Educativo',
        '0x3': 'Novela',
        '0x4': 'Minissérie',
        '0x5': 'Série/seriado',
        '0x6': 'Variedade',
        '0x7': 'Reality show',
        '0x8': 'Informação',
        '0x9': 'Humorístico',
        '0xA': 'Infantil',
        '0xB': 'Erótico',
        '0xC': 'Filme',
        '0xD': 'Sorteio, televendas, premiação',
        '0xE': 'Debate/entrevista',
        '0xF': 'Outros',
      };

      const subcat = {
        '0x00': 'Telejornais',
        '0x01': 'Reportagem',
        '0x02': 'Documentário',
        '0x03': 'Biografia',
        '0x10': 'Esporte',
        '0x20': 'Educativo',
        '0x30': 'Novela',
        '0x40': 'Minissérie',
        '0x50': 'Série',
        '0x60': 'Auditório',
        '0x61': 'Show',
        '0x62': 'Musical',
        '0x63': 'Making of',
        '0x64': 'Feminino',
        '0x65': 'Game Show',
        '0x70': 'Reality show',
        '0x80': 'Culinária',
        '0x81': 'Moda',
        '0x82': 'Rural',
        '0x83': 'Saúde',
        '0x84': 'Turismo',
        '0x90': 'Humorístico',
        '0xA0': 'Infantil',
        '0xB0': 'Erótico',
        '0xC0': 'Filme',
        '0xD0': 'Sorteio',
        '0xD1': 'Televendas',
        '0xD2': 'Premiação',
        '0xE0': 'Debate',
        '0xE1': 'Entrevista',
        '0xF0': 'Desenho adulto',
        '0xF1': 'Interativo',
        '0xF2': 'Político',
        '0xF3': 'Religioso',
        '0xFF': 'Outros',
      };

      const category =
        categoryp[
          prog[
            firstLine.indexOf('content_nibble_level_1 + content_nibble_level_2')
          ].slice(0, -1)
        ];
      const subcategory =
        subcat[
          prog[
            firstLine.indexOf('content_nibble_level_1 + content_nibble_level_2')
          ]
        ] ?? 'Outros';
      const ratingStr = prog[firstLine.indexOf('rating')];

      const hex2bin = data =>
        data
          .slice(3, 5)
          .split('')
          .map(i => parseInt(i, 16).toString(2).padStart(4, '0'))
          .join('');

      const base = '0b';
      const bcont = base.concat(hex2bin(`0x0${ratingStr[2]}`));
      const content: ProgramContent = contentp[Number(bcont)];
      const brate = base.concat(hex2bin(`0x0${ratingStr[3]}`));
      const rating: ProgramRating = rate[Number(brate)];

      return new Program({
        title,
        description,
        startDateTime,
        duration,
        content,
        rating,
        category,
        subcategory,
      });
    });
  }

  static async parseFile(file: File): Promise<Program[]> {
    const content = await readFileAsync(file);
    if (content.indexOf('programme') > 0) {
      // its a xml file
      return this.parseXml(content);
    }
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
