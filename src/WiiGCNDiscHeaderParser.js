const BinaryParser = require('binary-parser').Parser;

const Regions = {
  D: 'German',
  E: 'USA',
  F: 'France',
  I: 'Italy',
  J: 'Japan',
  K: 'Korea',
  P: 'PAL',
  R: 'Russia',
  S: 'Spanish',
  T: 'Taiwan',
  U: 'Australia',
};
const NintendoHeaderParser = new BinaryParser()
  .string('discID', { length: 1 })
  .string('gameCode', { length: 2 })
  .string('regionCode', { length: 1 })
  .string('makerCode', { length: 2 })
  .uint8('discNumber')
  .uint8('discVersion')
  .uint8('audioStreaming')
  .uint8('streamingBufferSize')
  .skip(14)
  .uint32('wiiMagicword')
  .uint32('gamecubeMagicword')
  .string('gameTitle', {
    length: 64, formatter: (title) => title.replace(/\u0000/g, ''),
  })
  .uint8('disableHashVerification')
  .uint8('disableDiscEncryption')
  .array('padding', { length: 380, type: 'uint8' });

const DefaultParser = new BinaryParser()
  .nest('header', { type: NintendoHeaderParser });

const WBFSParser = new BinaryParser()
  .skip(512)
  .nest('header', { type: NintendoHeaderParser });

const DiscHeaderBinaryParser = new BinaryParser()
  .string('magic', { length: 4, formatter: (stringValue) => (stringValue === 'WBFS' ? 1 : 0) })
  .seek(-4)
  .choice({
    tag: 'magic',
    choices: {
      1: WBFSParser,
    },
    defaultChoice: DefaultParser,
  });

const ParseDisc = (buffer) => {
  const { header } = DiscHeaderBinaryParser.parse(buffer);
  return {
    titleId: `${header.discID}${header.gameCode}${header.regionCode}${header.makerCode}`,
    isGameCubeDisc: header.gamecubeMagicword !== 0,
    isWiiDisc: header.wiiMagicword !== 0,
    region: Regions[header.regionCode],
    ...header,
  };
};

module.exports.Parser = ParseDisc;
