import { XMLBuilder } from 'fast-xml-parser';
import { formatDateTime, addToDate, secondsToHms } from 'utils';
import Program, { ProgramRating } from './program';

interface Programme {
  title: {
    '#text': string;
    '@lang': string;
  };
  'sub-title': { '@lang': string };
  desc: {
    '#text': string;
    '@lang': string;
  };
  length: { '#text': number; '@units': string };
  rating: { value: string };
  category: { '#text': string; '@lang': string };
  '@channel': string;
  '@stop': string;
  '@start': string;
}

export default class EPGBuilder {
  static buildXml(programs: Program[]): string {
    const programmeList: Programme[] = [];

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

    programs.forEach(p => {
      programmeList.push({
        title: {
          '#text': p.title,
          '@lang': 'pt',
        },
        'sub-title': {
          '@lang': 'pt',
        },
        desc: {
          '#text': p.description,
          '@lang': 'pt',
        },
        length: {
          '#text': p.duration / 60,
          '@units': 'minutes',
        },
        rating: {
          value: p.rating.slice(1),
        },
        category: {
          '#text': '0xF',
          '@lang': 'pt',
        },
        '@channel': '59360',
        '@stop': formatDateTime(
          addToDate(p.startDateTime, p.duration),
          'yyyyMMddHHmm',
        ),
        '@start': formatDateTime(p.startDateTime, 'yyyyMMddHHmm'),
      });
    });

    const program = {
      tv: {
        '@date': formatDateTime(new Date(), 'yyyyMMddHHmmss'),
        channel: {
          '@id': '59360',
          'display-name': [
            {
              '#text': 'SBT - SÃO PAULO',
              '@lang': 'pt',
            },
            {
              '#text': 'SBT - SÃO PAULO',
              '@lang': 'pt',
            },
          ],
        },
        programme: programmeList,
      },
    };

    const builder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@',
      format: true,
      suppressEmptyNode: true,
    });
    return builder.build(program);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static buildCsv(programs: Program[]): string {
    const rate = {
      RSC: '0xf1',
      RL: '0xf1',
      R10: '0xf2',
      R12: '0xf3',
      R14: '0xf4',
      R16: '0xf5',
      R18: '0xf6',
    };

    /*
      "Event ID";"Audio number";"Copy control number";"Data contents number";"Broadcast starting date";"Broadcast starting time";"Duration";"Program title";"Program content";"Free CA mode";"video Component tag";"Stream_content + video component type";"Vido text";"audio component tag 1";"Steam content + audio component type 1";"audio multilingual flag 1";"audio main component flag 1";"audio quality indicator 1";"audio sampling rate 1";"main language code 1";"secondary language code 1";"audio text1 1";"audio text2 1";"audio stream type 1";"content_nibble_level_1 + content_nibble_level_2";"user_nibble";"degital recording control data all";"APS control all";"maximum bit rate all";"digital copy control type all";"digital copy component tag 1";"digital recording control data 1";"APS control 1";"maximum bit rate 1";"digital copy control type 1";"digital copy component tag 2";"digital recording control data 2";"APS control 2";"maximum bit rate 2";"digital copy control type 2";"data Component ID1";"entry component1";"selector byte1";"component ref1";"data contents text1";"group type";"Common service id";"Common event id";"series id";"repear label";"program patterm";"expire data";"episode number";"last episode number";"series name char";"extended_item_descriptor_char";"extended_item_char";"Country Code";"rating";"Image constration token";"Retention mode";" Retention state";" Encryption mode";" linkage transport stream id";" linkage original network id";" linkage service id";" linkage type";" any"
      4015;1;2;1;20220622;165500;010000;"VALE A PENA VER DE NOVO";"Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"VALE A PENA VER DE NOVO";"BRA";"0x03";0;0;0;0;;;;;
    */

    const csvLines = programs.map((p, i) =>
      [
        `${1 + i}`,
        '1',
        '2',
        '1',
        formatDateTime(p.startDateTime, 'yyyyMMdd'),
        formatDateTime(p.startDateTime, 'HHmmss'),
        secondsToHms(p.duration, ''),
        `"${p.title}"`,
        `"${p.description}"`,
        '0',
        '"0x00"',
        '"0x05B3"',
        '',
        '"0x10"',
        '"0x0603"',
        '0',
        '1',
        '1',
        '7',
        '"por"',
        '',
        '"Estéreo"',
        '',
        '"0x11"',
        '"0x30"',
        '"0xE0"',
        '0',
        '2',
        '0',
        '1',
        '"0x00"',
        '0',
        '0',
        '0',
        '1',
        '"0x10"',
        '0',
        '0',
        '0',
        '1',
        '"0x0008"',
        '"0x30"',
        '"0113706F72"',
        '',
        '"Closed Caption"',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '2',
        '',
        `"${p.title}"`,
        '"BRA"',
        `"${rate[p.rating ?? ProgramRating.RSC]}"`,
        '0',
        '0',
        '0',
        '0',
        '',
        '',
        '',
        '',
        '',
      ].join(';'),
    );

    const outputCsv = [
      `"Event ID";"Audio number";"Copy control number";"Data contents number";"Broadcast starting date";"Broadcast starting time";"Duration";"Program title";"Program content";"Free CA mode";"video Component tag";"Stream_content + video component type";"Vido text";"audio component tag 1";"Steam content + audio component type 1";"audio multilingual flag 1";"audio main component flag 1";"audio quality indicator 1";"audio sampling rate 1";"main language code 1";"secondary language code 1";"audio text1 1";"audio text2 1";"audio stream type 1";"content_nibble_level_1 + content_nibble_level_2";"user_nibble";"degital recording control data all";"APS control all";"maximum bit rate all";"digital copy control type all";"digital copy component tag 1";"digital recording control data 1";"APS control 1";"maximum bit rate 1";"digital copy control type 1";"digital copy component tag 2";"digital recording control data 2";"APS control 2";"maximum bit rate 2";"digital copy control type 2";"data Component ID1";"entry component1";"selector byte1";"component ref1";"data contents text1";"group type";"Common service id";"Common event id";"series id";"repear label";"program patterm";"expire data";"episode number";"last episode number";"series name char";"extended_item_descriptor_char";"extended_item_char";"Country Code";"rating";"Image constration token";"Retention mode";" Retention state";" Encryption mode";" linkage transport stream id";" linkage original network id";" linkage service id";" linkage type";" any"`,
      ...csvLines,
    ];

    return `${outputCsv.join('\n')}`;
  }
}
