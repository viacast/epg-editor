import { XMLBuilder } from 'fast-xml-parser';
import { Program } from './program';

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

const getDateTime = (date: Date, length?: number) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  let d = date.getUTCDate();
  let h = date.getHours();
  let mm = date.getMinutes();
  const s = date.getSeconds();

  if (length) {
    const l = length;

    mm += Math.ceil(l / 60);
    if (mm >= 60) {
      h += Math.floor(mm / 60);
      mm %= 60;
    }
    if (h >= 24) {
      d += Math.floor(mm / 24);
      h %= 24;
    }
  }

  let auxMonth = m.toString();
  if (m <= 10) auxMonth = `0${m.toString()}`;

  let auxDay = d.toString();
  if (d <= 10) auxDay = `0${d.toString()}`;

  let auxHour = h.toString();
  if (h <= 10) auxHour = `0${h.toString()}`;

  let auxMin = mm.toString();
  if (mm <= 10) auxMin = `0${mm.toString()}`;

  let auxSec = s.toString();
  if (s <= 10) auxSec = `0${s.toString()}`;

  return `${y.toString()}${auxMonth}${auxDay}${auxHour}${auxMin}${auxSec}`;
};

const getDuration = (duration: number) => {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  seconds += duration;
  if (seconds >= 60) {
    minutes += Math.floor(seconds / 60);
    seconds %= 60;
  }
  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes %= 60;
  }

  let auxHour = hours.toString();
  if (hours <= 10) auxHour = `0${hours.toString()}`;

  let auxMin = minutes.toString();
  if (minutes <= 10) auxMin = `0${minutes.toString()}`;

  let auxSec = seconds.toString();
  if (seconds <= 10) auxSec = `0${seconds.toString()}`;

  return `${auxHour}${auxMin}${auxSec}`;
};
export default class EPGBuilder {
  static buildXml(programs: Program[]): string {
    const programmeList: Programme[] = [];

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
        '@stop': getDateTime(p.startTime, p.duration).slice(0, 12),
        '@start': getDateTime(p.startTime).slice(0, 12),
      });
    });

    const program = {
      tv: {
        '@date': getDateTime(new Date(2022, 5, 12, 11, 52, 7)),
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
      RL: '0xf1',
      R10: '0xf2',
      R12: '0xf3',
      R14: '0xf4',
      R16: '0xf5',
      R18: '0xf6',
    };

    const csvLines = programs.map((p, i) =>
      [
        `${1 + i}`,
        '1',
        '2',
        '1',
        getDateTime(p.startDate).slice(0, 8),
        getDateTime(p.startTime).slice(8, 14),
        getDuration(p.duration),
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
        `"${rate[p.rating]}"`,
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
