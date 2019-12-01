const assert = require('assert');

const {
  bufferToFilepaths,
  filepathsToBuffer,
} = require('../../dist/bundle.js');

// Lorem ipsum text converted to base64. Text from https://en.wikipedia.org/wiki/Lorem_ipsum
// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
const loremIpsumBase64 =
  'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuIFV0IGVuaW0gYWQgbWluaW0gdmVuaWFtLCBxdWlzIG5vc3RydWQgZXhlcmNpdGF0aW9uIHVsbGFtY28gbGFib3JpcyBuaXNpIHV0IGFsaXF1aXAgZXggZWEgY29tbW9kbyBjb25zZXF1YXQuIER1aXMgYXV0ZSBpcnVyZSBkb2xvciBpbiByZXByZWhlbmRlcml0IGluIHZvbHVwdGF0ZSB2ZWxpdCBlc3NlIGNpbGx1bSBkb2xvcmUgZXUgZnVnaWF0IG51bGxhIHBhcmlhdHVyLiBFeGNlcHRldXIgc2ludCBvY2NhZWNhdCBjdXBpZGF0YXQgbm9uIHByb2lkZW50LCBzdW50IGluIGN1bHBhIHF1aSBvZmZpY2lhIGRlc2VydW50IG1vbGxpdCBhbmltIGlkIGVzdCBsYWJvcnVtLg==';

const loremIpsumFilepaths = [
  '📂💫😎1_TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFt',
  '📂💫😎2_ZXQsIGNvbnNlY3RldHVyIGFkaXBpc2Np',
  '📂💫😎3_bmcgZWxpdCwgc2VkIGRvIGVpdXNtb2Qg',
  '📂💫😎4_dGVtcG9yIGluY2lkaWR1bnQgdXQgbGFi',
  '📂💫😎5_b3JlIGV0IGRvbG9yZSBtYWduYSBhbGlx',
  '📂💫😎6_dWEuIFV0IGVuaW0gYWQgbWluaW0gdmVu',
  '📂💫😎7_aWFtLCBxdWlzIG5vc3RydWQgZXhlcmNp',
  '📂💫😎8_dGF0aW9uIHVsbGFtY28gbGFib3JpcyBu',
  '📂💫😎9_aXNpIHV0IGFsaXF1aXAgZXggZWEgY29t',
  '📂💫😎10_bW9kbyBjb25zZXF1YXQuIER1aXMgYXV0',
  '📂💫😎11_ZSBpcnVyZSBkb2xvciBpbiByZXByZWhl',
  '📂💫😎12_bmRlcml0IGluIHZvbHVwdGF0ZSB2ZWxp',
  '📂💫😎13_dCBlc3NlIGNpbGx1bSBkb2xvcmUgZXUg',
  '📂💫😎14_ZnVnaWF0IG51bGxhIHBhcmlhdHVyLiBF',
  '📂💫😎15_eGNlcHRldXIgc2ludCBvY2NhZWNhdCBj',
  '📂💫😎16_dXBpZGF0YXQgbm9uIHByb2lkZW50LCBz',
  '📂💫😎17_dW50IGluIGN1bHBhIHF1aSBvZmZpY2lh',
  '📂💫😎18_IGRlc2VydW50IG1vbGxpdCBhbmltIGlk',
  '📂💫😎19_IGVzdCBsYWJvcnVtLg=='
];

describe('Buffer conversion', () => {
  describe('bufferToFilepaths()', () => {
    it('should return an array of filepaths for a buffer', () => {
      const buffer = Buffer.from(loremIpsumBase64, 'base64');
      const filepaths = bufferToFilepaths(buffer);
      assert.deepEqual(filepaths, loremIpsumFilepaths);
    });
  });

  describe('filepathsToBuffer()', () => {
    it('should return a buffer for an array of filepaths', () => {
      const buffer = filepathsToBuffer(loremIpsumFilepaths);
      assert.equal(buffer.toString('base64'), loremIpsumBase64);
    });
  });
});
