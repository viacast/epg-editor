import { XMLBuilder } from 'fast-xml-parser';
import { formatDateTime, addToDate, secondsToHms } from 'utils';
import Program, {
  ProgramCategory,
  ProgramContent,
  ProgramRating,
} from './program';

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
      const aux1 = p.rating.slice(1);
      let rate = 0;
      if (aux1 === 'SC') {
        rate = 0;
      } else if (aux1 === 'L') {
        rate = 1;
      } else if (aux1 === '10') {
        rate = 2;
      } else if (aux1 === '12') {
        rate = 3;
      } else if (aux1 === '14') {
        rate = 4;
      } else if (aux1 === '16') {
        rate = 5;
      } else if (aux1 === '18') {
        rate = 6;
      }

      const aux2 = p.content;
      let cont = 0;
      if (aux2 === '') {
        cont = 0;
      } else if (aux2 === 'Drugs') {
        cont = 1;
      } else if (aux2 === 'Violence') {
        cont = 2;
      } else if (aux2 === 'Sex') {
        cont = 3;
      } else if (aux2 === 'Drugs and Violence') {
        cont = 4;
      } else if (aux2 === 'Drugs and Sex') {
        cont = 5;
      } else if (aux2 === 'Violence and Sex') {
        cont = 6;
      } else if (aux2 === 'Drugs, Violence and Sex') {
        cont = 7;
      }

      const categoryp = {
        Jornalismo: '0x0',
        Esporte: '0x1',
        Educativo: '0x2',
        Novela: '0x3',
        Minissérie: '0x4',
        'Série/seriado': '0x5',
        Variedade: '0x6',
        'Reality show': '0x7',
        Informação: '0x8',
        Humorístico: '0x9',
        Infantil: '0xA',
        Erótico: '0xB',
        Filme: '0xC',
        'Sorteio, televendas, premiação': '0xD',
        'Debate/entrevista': '0xE',
        Outros: '0xF',
      };

      const subcat = {
        Telejornais: '0x00',
        Reportagem: '0x01',
        Documentário: '0x02',
        Biografia: '0x03',
        Esporte: '0x10',
        Educativo: '0x20',
        Novela: '0x30',
        Minissérie: '0x40',
        Série: '0x50',
        Auditório: '0x60',
        Show: '0x61',
        Musical: '0x62',
        'Making of': '0x63',
        Feminino: '0x64',
        'Game Show': '0x65',
        'Reality show': '0x70',
        Culinária: '0x80',
        Moda: '0x81',
        Rural: '0x82',
        Saúde: '0x83',
        Turismo: '0x84',
        Humorístico: '0x90',
        Infantil: '0xA0',
        Erótico: '0xB0',
        Filme: '0xC0',
        Sorteio: '0xD0',
        Televendas: '0xD1',
        Premiação: '0xD2',
        Debate: '0xE0',
        Entrevista: '0xE1',
        'Desenho adulto': '0xF0',
        Interativo: '0xF1',
        Político: '0xF2',
        Religioso: '0xF3',
        Outros: '0xFF',
      };

      let cat = categoryp[p.category ?? ProgramCategory['0xF']];

      if (
        cat !== ProgramCategory['0xF'] &&
        (!subcat[p.subcategory] || subcat[p.subcategory] === '0xFF')
      ) {
        cat = `${categoryp[p.category]}F`;
      } else {
        cat = subcat[p.subcategory];
      }

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
          value: `${cont}${rate}`,
        },
        category: {
          '#text': cat, // '0xF',
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
        // channel: {
        //   '@id': '59360',
        //   'display-name': [
        //     {
        //       '#text': 'SBT - SÃO PAULO',
        //       '@lang': 'pt',
        //     },
        //     {
        //       '#text': 'SBT - SÃO PAULO',
        //       '@lang': 'pt',
        //     },
        //   ],
        // },
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
      RSC: '0',
      RL: '1',
      R10: '2',
      R12: '3',
      R14: '4',
      R16: '5',
      R18: '6',
    };

    const contentp = {
      '': '0',
      Drugs: '1',
      Violence: '2',
      Sex: '3',
      'Drugs and Violence': '4',
      'Drugs and Sex': '5',
      'Violence and Sex': '6',
      'Drugs, Violence and Sex': '7',
    };

    const categoryp = {
      Jornalismo: '0x0',
      Esporte: '0x1',
      Educativo: '0x2',
      Novela: '0x3',
      Minissérie: '0x4',
      'Série/seriado': '0x5',
      Variedade: '0x6',
      'Reality show': '0x7',
      Informação: '0x8',
      Humorístico: '0x9',
      Infantil: '0xA',
      Erótico: '0xB',
      Filme: '0xC',
      'Sorteio, televendas, premiação': '0xD',
      'Debate/entrevista': '0xE',
      Outros: '0xF',
    };

    const subcat = {
      Telejornais: '0x00',
      Reportagem: '0x01',
      Documentário: '0x02',
      Biografia: '0x03',
      Esporte: '0x10',
      Educativo: '0x20',
      Novela: '0x30',
      Minissérie: '0x40',
      Série: '0x50',
      Auditório: '0x60',
      Show: '0x61',
      Musical: '0x62',
      'Making of': '0x63',
      Feminino: '0x64',
      'Game Show': '0x65',
      'Reality show': '0x70',
      Culinária: '0x80',
      Moda: '0x81',
      Rural: '0x82',
      Saúde: '0x83',
      Turismo: '0x84',
      Humorístico: '0x90',
      Infantil: '0xA0',
      Erótico: '0xB0',
      Filme: '0xC0',
      Sorteio: '0xD0',
      Televendas: '0xD1',
      Premiação: '0xD2',
      Debate: '0xE0',
      Entrevista: '0xE1',
      'Desenho adulto': '0xF0',
      Interativo: '0xF1',
      Político: '0xF2',
      Religioso: '0xF3',
      Outros: '0xFF',
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
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        `${`${categoryp[p.category ?? ProgramCategory['0xF']]}${subcat[
          p.subcategory
        ].slice(-1)}`}`,
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
        `0x${contentp[p.content ?? ProgramContent.F]}${
          rate[p.rating ?? ProgramRating.RSC]
        }`,
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
      // `"Event ID";"Audio number";"Copy control number";"Data contents number";"Broadcast starting date";"Broadcast starting time";"Duration";"Program title";"Program content";"Free CA mode";"video Component tag";"Stream_content + video component type";"Vido text";"audio component tag 1";"Steam content + audio component type 1";"audio multilingual flag 1";"audio main component flag 1";"audio quality indicator 1";"audio sampling rate 1";"main language code 1";"secondary language code 1";"audio text1 1";"audio text2 1";"audio stream type 1";"content_nibble_level_1 + content_nibble_level_2";"user_nibble";"degital recording control data all";"APS control all";"maximum bit rate all";"digital copy control type all";"digital copy component tag 1";"digital recording control data 1";"APS control 1";"maximum bit rate 1";"digital copy control type 1";"digital copy component tag 2";"digital recording control data 2";"APS control 2";"maximum bit rate 2";"digital copy control type 2";"data Component ID1";"entry component1";"selector byte1";"component ref1";"data contents text1";"group type";"Common service id";"Common event id";"series id";"repear label";"program patterm";"expire data";"episode number";"last episode number";"series name char";"extended_item_descriptor_char";"extended_item_char";"Country Code";"rating";"Image constration token";"Retention mode";" Retention state";" Encryption mode";" linkage transport stream id";" linkage original network id";" linkage service id";" linkage type";" any"`,
      `"Event ID";"Audio number";"Copy control number";"Data contents number";"Broadcast starting date";"Broadcast starting time";"Duration";"Program title";"Program content";"Free CA mode";"video Component tag";"Stream_content + video component type";"Vido text";"audio component tag 1";"Steam content + audio component type 1";"audio multilingual flag 1";"audio main component flag 1";"audio quality indicator 1";"audio sampling rate 1";"main language code 1";"secondary language code 1";"audio text1 1";"audio text2 1";"audio stream type 1";"audio component tag 2";"Steam content + audio component type 2";"audio multilingual flag 2";"audio main component flag 2";"audio quality indicator 2";"audio sampling rate 2";"main language code 2";"secondary language code 2";"audio text1 2";"audio text2 2";"audio stream type 2";"content_nibble_level_1 + content_nibble_level_2";"user_nibble";"degital recording control data all";"APS control all";"maximum bit rate all";"digital copy control type all";"digital copy component tag 1";"digital recording control data 1";"APS control 1";"maximum bit rate 1";"digital copy control type 1";"digital copy component tag 2";"digital recording control data 2";"APS control 2";"maximum bit rate 2";"digital copy control type 2";"data Component ID1";"entry component1";"selector byte1";"component ref1";"data contents text1";"group type";"Common service id";"Common event id";"series id";"repear label";"program patterm";"expire data";"episode number";"last episode number";"series name char";"extended_item_descriptor_char";"extended_item_char";"Country Code";"rating";"Image constration token";"Retention mode";"Retention state";"Encryption mode";"linkage transport stream id";"linkage original network id";"linkage service id";"linkage type";"any"`,
      ...csvLines,
    ];

    return `${outputCsv.join('\n')}`;
  }
}
