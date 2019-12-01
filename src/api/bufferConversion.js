import base32 from 'base32';

const FILEPATH_PREFIX = '📂💫😎';
const FILEPATH_SEPARATOR = '_';
const BASE32_CHUNK_LENGTH = 32;

/**
 * Filename regex: /📂💫😎(\d+)_(.{1,32})$/
 */
const filenameRegex = new RegExp(
  `${FILEPATH_PREFIX}(\\d+)${FILEPATH_SEPARATOR}(.{1,${BASE32_CHUNK_LENGTH}})$`,
);

/**
 * Convert a buffer to an array of filenames.
 * 
 * @param   {object}    buffer  Buffer
 * @return  {[string]}          Filenames
 */
export const bufferToFilenames = (buffer) => {
  const filepaths = [];

  let base64String = buffer.toString('base64');
  let base32String = base32.encode(base64String);

  // index 0 is reserved for future use such as export metadata
  for (let i = 1; base32String.length; i += 1) {
    const chunkLength = Math.min(base32String.length, BASE32_CHUNK_LENGTH);
    const base32Chunk = base32String.substring(0, chunkLength);
    filepaths.push(`${FILEPATH_PREFIX}${i}${FILEPATH_SEPARATOR}${base32Chunk}`);

    base32String = base32String.substring(chunkLength);
  }

  return filepaths;
};

/**
 * Convert an array of filenames to a base64 string.
 * 
 * @param   {[string]}  filepaths  Filepaths
 * @return  {object}    buffer     Buffer
 */
export const filenamesToBuffer = (filepaths) => {
  const base32Array = [];

  filepaths.forEach((filepath) => {
    const match = filepath.match(filenameRegex);
    if (match.length === 3) {
      const [ , indexString, base32Chunk ] = match;
      const index = parseInt(indexString, 10);

      while (index > base32Array.length) {
        base32Array.push(null);
      }

      base32Array[index] = base32Chunk;
    }
  });

  let base32String = '';

  base32Array.forEach((base32Chunk, index) => {
    // index 0 is reserved for future use such as export metadata
    if (index === 0) {
      return;
    }

    if (base32Chunk === null) {
      throw new Error(`Missing base32 chunk`);
    }

    base32String += base32Chunk;
  });

  const buffer = Buffer.from(base32.decode(base32String), 'base64');

  return buffer;
};