import { XMLParser } from 'fast-xml-parser';
import short from 'short-uuid';
import EPGBuilder from '../../../src/services/epg/builder';
import { Program, ProgramRating } from '../../../src/services/epg/program';

const programs: Program[] = [
  {
    id: short.generate(),
    title: '1º Jornal',
    description:
      'As principais notícias do Brasil e do Mundo, com agilidade e prestação de serviços, deixando o telespectador bem informado logo nas primeiras horas da manhã.',
    startDate: new Date(2022, 5, 12),
    startTime: new Date(2022, 5, 12, 4, 0, 0),
    duration: 7200,
    rating: ProgramRating.R10,
  },
  {
    id: short.generate(),
    title: 'Bora SP',
    description:
      'Programa jornalístico leve, interativo e com muita prestação de serviço, valorizando sempre as notícias locais.',
    startDate: new Date(2022, 5, 12),
    startTime: new Date(2022, 5, 12, 6, 0, 0),
    duration: 5400,
    rating: ProgramRating.R12,
  },
  {
    id: short.generate(),
    title: 'Bora Brasil',
    description:
      'As principais informações do Brasil e do Mundo com leveza, interatividade e credibilidade.',
    startDate: new Date(2022, 5, 12),
    startTime: new Date(2022, 5, 12, 7, 30, 0),
    duration: 5400,
    rating: ProgramRating.RL,
  },
];

const expectedCsv = `"Event ID";"Audio number";"Copy control number";"Data contents number";"Broadcast starting date";"Broadcast starting time";"Duration";"Program title";"Program content";"Free CA mode";"video Component tag";"Stream_content + video component type";"Vido text";"audio component tag 1";"Steam content + audio component type 1";"audio multilingual flag 1";"audio main component flag 1";"audio quality indicator 1";"audio sampling rate 1";"main language code 1";"secondary language code 1";"audio text1 1";"audio text2 1";"audio stream type 1";"content_nibble_level_1 + content_nibble_level_2";"user_nibble";"degital recording control data all";"APS control all";"maximum bit rate all";"digital copy control type all";"digital copy component tag 1";"digital recording control data 1";"APS control 1";"maximum bit rate 1";"digital copy control type 1";"digital copy component tag 2";"digital recording control data 2";"APS control 2";"maximum bit rate 2";"digital copy control type 2";"data Component ID1";"entry component1";"selector byte1";"component ref1";"data contents text1";"group type";"Common service id";"Common event id";"series id";"repear label";"program patterm";"expire data";"episode number";"last episode number";"series name char";"extended_item_descriptor_char";"extended_item_char";"Country Code";"rating";"Image constration token";"Retention mode";" Retention state";" Encryption mode";" linkage transport stream id";" linkage original network id";" linkage service id";" linkage type";" any"
1;1;2;1;20220612;040000;020000;"1º Jornal";"As principais notícias do Brasil e do Mundo, com agilidade e prestação de serviços, deixando o telespectador bem informado logo nas primeiras horas da manhã.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"1º Jornal";"BRA";"0xf2";0;0;0;0;;;;;
2;1;2;1;20220612;060000;013000;"Bora SP";"Programa jornalístico leve, interativo e com muita prestação de serviço, valorizando sempre as notícias locais.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"Bora SP";"BRA";"0xf3";0;0;0;0;;;;;
3;1;2;1;20220612;073000;013000;"Bora Brasil";"As principais informações do Brasil e do Mundo com leveza, interatividade e credibilidade.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"Bora Brasil";"BRA";"0xf1";0;0;0;0;;;;;`;

const expectedXml = `
    <tv date="20220612115207">
      <channel id="59360">
          <display-name lang="pt">SBT - SÃO PAULO</display-name>
          <display-name lang="pt">SBT - SÃO PAULO</display-name>
      </channel>
      <programme channel="59360" stop="202206120600" start="202206120400">
          <title lang="pt">1º Jornal</title>
          <sub-title lang="pt"/>
          <desc lang="pt">As principais notícias do Brasil e do Mundo, com agilidade e prestação de serviços, deixando o telespectador bem informado logo nas primeiras horas da manhã.</desc>
          <length units="minutes">120</length>
          <rating>
              <value>10</value>
          </rating>
          <category lang="pt">0xF</category>
      </programme>
      <programme channel="59360" stop="202206120730" start="202206120600">
          <title lang="pt">Bora SP</title>
          <sub-title lang="pt"/>
          <desc lang="pt">Programa jornalístico leve, interativo e com muita prestação de serviço, valorizando sempre as notícias locais.</desc>
          <length units="minutes">90</length>
          <rating>
              <value>12</value>
          </rating>
          <category lang="pt">0xF</category>
      </programme>
      <programme channel="59360" stop="202206120900" start="202206120730">
          <title lang="pt">Bora Brasil</title>
          <sub-title lang="pt"/>
          <desc lang="pt">As principais informações do Brasil e do Mundo com leveza, interatividade e credibilidade.</desc>
          <length units="minutes">90</length>
          <rating>
              <value>L</value>
          </rating>
          <category lang="pt">0xF</category>
      </programme>
    </tv>
`;

describe('Builder CSV', () => {
  it('should return a valid csv file from a list of programs', () => {
    const csvPrograms = EPGBuilder.buildCsv(programs);
    const csvProgramRows = csvPrograms.split('\n');
    const expectedCsvRows = expectedCsv.split('\n');
    expect(csvProgramRows).toHaveLength(expectedCsvRows.length);
    csvProgramRows.forEach((row, i) => {
      const columns = row.trim().split(';');
      const expectedColumns = expectedCsvRows[i].trim().split(';');
      // expect(columns).toHaveLength(expectedColumns.length);
      expect(columns).toEqual(expectedColumns);
    });
  });
});

describe('Builder XML', () => {
  it('should return a valid xml file from a list of programs', () => {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });
    const xmlPrograms = parser.parse(EPGBuilder.buildXml(programs));
    const xmlExpected = parser.parse(expectedXml);
    expect(xmlPrograms).toMatchObject(xmlExpected);
  });
});
