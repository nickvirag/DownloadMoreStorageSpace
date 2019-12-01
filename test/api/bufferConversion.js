const assert = require('assert');

const {
  bufferToFilenames,
  filenamesToBuffer,
} = require('../../dist/bundle.js');

// Lorem ipsum text converted to base64. Text from https://en.wikipedia.org/wiki/Lorem_ipsum
// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
const loremIpsumBase64 =
  'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuIFV0IGVuaW0gYWQgbWluaW0gdmVuaWFtLCBxdWlzIG5vc3RydWQgZXhlcmNpdGF0aW9uIHVsbGFtY28gbGFib3JpcyBuaXNpIHV0IGFsaXF1aXAgZXggZWEgY29tbW9kbyBjb25zZXF1YXQuIER1aXMgYXV0ZSBpcnVyZSBkb2xvciBpbiByZXByZWhlbmRlcml0IGluIHZvbHVwdGF0ZSB2ZWxpdCBlc3NlIGNpbGx1bSBkb2xvcmUgZXUgZnVnaWF0IG51bGxhIHBhcmlhdHVyLiBFeGNlcHRldXIgc2ludCBvY2NhZWNhdCBjdXBpZGF0YXQgbm9uIHByb2lkZW50LCBzdW50IGluIGN1bHBhIHF1aSBvZmZpY2lhIGRlc2VydW50IG1vbGxpdCBhbmltIGlkIGVzdCBsYWJvcnVtLg==';

const loremIpsumFilepaths = [
  '📂💫😎1_ah3kjyauawr6erar89x68ntgcxd4eebk',
  '📂💫😎2_c8tmjtv369p30ja78tu5mp2hed4mekkp',
  '📂💫😎3_c9q4wv2t6d96rt28atwmjhu6ddgnggkg',
  '📂💫😎4_cct4ww32dnhpepjqf1r68gvqcxhk4nkb',
  '📂💫😎5_953n4xj98xb70t2r9tu64cjhcxj4enkm',
  '📂💫😎6_cd3kjya98xp7ap9jdhnp2nuj65h6wmb7',
  '📂💫😎7_chc52tv28x36jrhk99p4jhup614memkp',
  '📂💫😎8_c93kjyauad178paqchunjmu2d1h4ev3r',
  '📂💫😎9_chbmaxa98tb30ja7atup2ntgcxcnemb7',
  '📂💫😎10_c9bprxb1awr6et3datup2nu6eh646gkr',
  '📂💫😎11_chbpryj98wuqcrtka9wp8nuhcxd5gu3c',
  '📂💫😎12_cdpmww348x330raq75umjj2pedh4ehkm',
  '📂💫😎13_b4t3gtv28x36jrhk99r66ya2engngkkg',
  '📂💫😎14_9545cc298x376rar8rrp2p21cxd5gtv7',
  '📂💫😎15_b9bmatut68wq8rjq75np4ya2d9h34dbu',
  '📂💫😎16_b9c4ccatb18qaja5a8rp2p2dcxcngnhg',
  '📂💫😎17_b99m4w33dtb7jpjk89np4ckrethpjgkg',
  '📂💫😎18_c9mm4yaub117jpjqd1p64vajdhhpuv1g',
  '📂💫😎19_953prxa991d7crj8atvp8hu661d56ghj',
  '📂💫😎20_b9bqgw348d16rrtk9tp4jhuee1h4ey1h',
  '📂💫😎21_c99m4uv269w7crvdanknmp2ncxd6wnke',
  '📂💫😎22_c5bmcc298wuk2rj7f1m4jj22d1hpuv38',
  '📂💫😎23_ch45cyacd514cta79tp66j2jdhj5gjb7',
  '📂💫😎24_cct6rxb48d17cp9j9tm5mnued1j46gka',
  '📂💫😎25_chc44w2u8x330para5kp4v9ten4mggkt',
  '📂💫😎26_c8t6ruuuawuk0k2389x68ntn614mev3n',
  '📂💫😎27_953mwcb29116gja88rrp2mu2etd6upkg',
  '📂💫😎28_b4t6ru298x96rrtjatwp8ntn614mecbp',
  '📂💫😎29_c93qgw348d16grkddhu4jhvcdd4menku',
  '📂💫😎30_ch1m4wutax57crveatu4rttx7m',
];

describe('Buffer conversion', () => {
  describe('bufferToFilenames()', () => {
    it('should return an array of filepaths for a buffer', () => {
      const buffer = Buffer.from(loremIpsumBase64, 'base64');
      const filepaths = bufferToFilenames(buffer);
      assert.deepEqual(filepaths, loremIpsumFilepaths);
    });
  });

  describe('filenamesToBuffer()', () => {
    it('should return a buffer for an array of filepaths', () => {
      const buffer = filenamesToBuffer(loremIpsumFilepaths);
      assert.equal(buffer.toString('base64'), loremIpsumBase64);
    });
  });
});
