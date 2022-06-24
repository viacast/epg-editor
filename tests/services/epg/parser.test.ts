import EPGParser, { InvalidFile } from '../../../src/services/epg/parser';
import { Program, ProgramRating } from '../../../src/services/epg/program';

const validCsv = `
    "Event ID";"Audio number";"Copy control number";"Data contents number";"Broadcast starting date";"Broadcast starting time";"Duration";"Program title";"Program content";"Free CA mode";"video Component tag";"Stream_content + video component type";"Vido text";"audio component tag 1";"Steam content + audio component type 1";"audio multilingual flag 1";"audio main component flag 1";"audio quality indicator 1";"audio sampling rate 1";"main language code 1";"secondary language code 1";"audio text1 1";"audio text2 1";"audio stream type 1";"content_nibble_level_1 + content_nibble_level_2";"user_nibble";"degital recording control data all";"APS control all";"maximum bit rate all";"digital copy control type all";"digital copy component tag 1";"digital recording control data 1";"APS control 1";"maximum bit rate 1";"digital copy control type 1";"digital copy component tag 2";"digital recording control data 2";"APS control 2";"maximum bit rate 2";"digital copy control type 2";"data Component ID1";"entry component1";"selector byte1";"component ref1";"data contents text1";"group type";"Common service id";"Common event id";"series id";"repear label";"program patterm";"expire data";"episode number";"last episode number";"series name char";"extended_item_descriptor_char";"extended_item_char";"Country Code";"rating";"Image constration token";"Retention mode";" Retention state";" Encryption mode";" linkage transport stream id";" linkage original network id";" linkage service id";" linkage type";" any"
    4015;1;2;1;20220622;165500;010000;"VALE A PENA VER DE NOVO";"Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência é frente de tudo.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"VALE A PENA VER DE NOVO";"BRA";"0x03";0;0;0;0;;;;;
    4016;1;2;1;20220622;175500;003500;"MALHAÇÃO - VIDAS BRASILEIRAS";"Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"MALHAÇÃO - VIDAS BRASILEIRAS";"BRA";"0x03";0;0;0;0;;;;;
    4017;1;2;1;20220622;183000;004000;"ESPELHO DA VIDA";"De Elizabeth Jhin, a novela apresenta uma trama de amor e mistério que ultrapassa as barreiras do tempo e do espaço ao se desenrolar em duas épocas distintas concomitantemente.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"ESPELHO DA VIDA";"BRA";"0x32";0;0;0;0;;;;;
`;

const invalidCsv = `
    "Event ID";"Audio number";"Copy control number";"Data contents number";"Broadcast starting date";"Broadcast starting time";"Duration";"Program title";"Program content";"Free CA mode";"video Component tag";"Stream_content + video component type";"Vido text";"audio component tag 1";"Steam content + audio component type 1";"audio multilingual flag 1";"audio main component flag 1";"audio quality indicator 1";"audio sampling rate 1";"main language code 1";"secondary language code 1";"audio text1 1";"audio text2 1";"audio stream type 1";"content_nibble_level_1 + content_nibble_level_2";"user_nibble";"degital recording control data all";"APS control all";"maximum bit rate all";"digital copy control type all";"digital copy component tag 1";"digital recording control data 1";"APS control 1";"maximum bit rate 1";"digital copy control type 1";"digital copy component tag 2";"digital recording control data 2";"APS control 2";"maximum bit rate 2";"digital copy control type 2";"data Component ID1";"entry component1";"selector byte1";"component ref1";"data contents text1";"group type";"Common service id";"Common event id";"series id";"repear label";"program patterm";"expire data";"episode number";"last episode number";"series name char";"extended_item_descriptor_char";"extended_item_char";"Country Code";"rating";"Image constration token";"Retention mode";" Retention state";" Encryption mode";" linkage transport stream id";" linkage original network id";" linkage service id";" linkage type";" any"
    4015;1;2;1;20220622;165500;010000;"VALE A PENA VER DE NOVO";"Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência é frente de tudo.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"VALE A PENA VER DE NOVO";"BRA";"0x03";0;0;0;0;;;;;
    4016;1;2;1;20220622;175500;003500;"MALHAÇÃO";" uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"MALHAÇÃO - VIDAS BRASILEIRAS";"USA";"0x03";0;0;0;0;;;;;
    4017;1;2;1;20220622;183000;004000;"ESPELHO DA VIDA";"De Elizabeth Jhin, a novela apresenta uma trama de amor e mistério que ultrapassa as barreiras do tempo e do espaço ao se desenrolar em duas épocas distintas concomitantemente.";0;"0x00";"0x05B3";;"0x10";"0x0603";0;1;1;7;"por";;"Estéreo";;"0x11";"0x30";"0xE0";0;2;0;1;"0x00";0;0;0;1;"0x10";0;0;0;1;"0x0008";"0x30";"0113706F72";;"Closed Caption";;;;;;;;;;2;;"ESPELHO DA VIDA";"BRA";"0x32";0;0;0;0;;;;;
`;

const validXml = `
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
    <programme channel="59360" stop="202206251415" start="202206251200">
        <title lang="pt">SÁBADO SÉRIES</title>
        <sub-title lang="pt"/>
        <desc lang="pt">Séries de sábado no SBT.</desc>
        <length units="minutes">135</length>
        <rating>
            <value>L</value>
        </rating>
        <category lang="pt">0x1</category>
    </programme>
    <programme channel="59360" stop="202206251815" start="202206251415">
        <title lang="pt">PROGRAMA RAUL GIL</title>
        <sub-title lang="pt"/>
        <desc lang="pt">Raul Gil com seu bom humor e irreverência inova com as revelações da música brasileira no concurso Jovens Talentos, a polêmica do Pra Quem Você tira o Chapéu? e os talentos da molecada.</desc>
        <length units="minutes">240</length>
        <rating>
            <value>L</value>
        </rating>
        <category lang="pt">0x3</category>
    </programme>
    </tv>
`;

const invalidXml = `
    <tv date="20220621115207">
    <channel id="59360">
        <display-name>SBT - SÃO PAULO</display-name>
        <display-name>SBT - SÃO PAULO</display-name>
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
    <programme channel="59360" stop="202206251415" start="202206251200">
        <title lang="pt">SÁBADO SÉRIES</title>
        <sub-title lang="pt"/>
        <desc lang="pt">Séries de sábado no SBT.</desc>
        <length units="minutes">135</length>
        <rating>
            <value>L</value>
        </rating>
        <category lang="pt">0x1</category>
    </programme>
    <programme channel="59360" stop="202206251815" start="202206251415">
        <title lang="pt">PROGRAMA RAUL GIL</title>
        <sub-title lang="pt"/>
        <desc lang="pt">Raul Gil com seu bom humor e irreverência inova com as revelações da música brasileira no concurso Jovens Talentos, a polêmica do Pra Quem Você tira o Chapéu? e os talentos da molecada.</desc>
        <length units="minutes">240</length>
        <rating>
            <value>Sc</value>
        </rating>
        <category lang="pt">0x3</category>
    </programme>
    </tv>
`;

const csvPrograms: Partial<Program>[] = [
  {
    title: 'VALE A PENA VER DE NOVO',
    description:
      'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência é frente de tudo.',
    startDate: new Date(2022, 6, 22),
    startTime: new Date(2022, 6, 22, 16, 55, 0),
    duration: 3600,
    rating: ProgramRating.R12,
  },
  {
    title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
    description:
      'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
    startDate: new Date(2022, 6, 22),
    startTime: new Date(2022, 6, 22, 17, 55, 0),
    duration: 2100,
    rating: ProgramRating.R12,
  },
  {
    title: 'ESPELHO DA VIDA',
    description:
      'De Elizabeth Jhin, a novela apresenta uma trama de amor e mistério que ultrapassa as barreiras do tempo e do espaço ao se desenrolar em duas épocas distintas concomitantemente.',
    startDate: new Date(2022, 6, 22),
    startTime: new Date(2022, 6, 22, 18, 30, 0),
    duration: 2400,
    rating: ProgramRating.R10,
  },
];

const xmlPrograms: Partial<Program>[] = [
  {
    title: 'SABADO ANIMADO',
    description:
      'Seu fim de semana começa com muito mais alegria no Sábado Animado. Os desenhos que fazem sucesso entre a garotada de todas as idades estão reunidos aqui.',
    startDate: new Date(2022, 6, 25),
    startTime: new Date(2022, 6, 25, 6, 0, 0),
    duration: 21600,
    rating: ProgramRating.RL,
  },
  {
    title: 'SÁBADO SÉRIES',
    description: 'Séries de sábado no SBT.',
    startDate: new Date(2022, 6, 25),
    startTime: new Date(2022, 6, 25, 12, 0, 0),
    duration: 8100,
    rating: ProgramRating.RL,
  },
  {
    title: 'PROGRAMA RAUL GIL',
    description:
      'Raul Gil com seu bom humor e irreverência inova com as revelações da música brasileira no concurso Jovens Talentos, a polêmica do Pra Quem Você tira o Chapéu? e os talentos da molecada.',
    startDate: new Date(2022, 6, 25),
    startTime: new Date(2022, 6, 25, 14, 15, 0),
    duration: 14400,
    rating: ProgramRating.RL,
  },
];

describe('Parse CSV', () => {
  it('should throw an exception when parsing an invalid csv file', () => {
    expect(() => {
      EPGParser.parseCsv(invalidCsv);
    }).toThrow(InvalidFile);
  });
  it('should return a list of programs after parsing a valid csv file', () => {
    const programs = EPGParser.parseCsv(validCsv);
    expect(programs).toHaveLength(csvPrograms.length);
    programs.forEach((program, index) =>
      expect(program).toMatchObject(csvPrograms[index]),
    );
  });
});

describe('Parse XML', () => {
  it('should throw an exception when parsing an invalid xml file', () => {
    expect(() => {
      EPGParser.parseXml(invalidXml);
    }).toThrow(InvalidFile);
  });
  it('should return a list of programs after parsing a valid xml file', () => {
    const programs = EPGParser.parseXml(validXml);
    expect(programs).toHaveLength(xmlPrograms.length);
    programs.forEach((program, index) =>
      expect(program).toMatchObject(xmlPrograms[index]),
    );
  });
});
