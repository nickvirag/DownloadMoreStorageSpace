const FILEPATH_PREFIX = '📂💫😎';
const FILEPATH_SEPARATOR = '_';
const BASE64_CHUNK_LENGTH = 32;

/**
 * Filename regex: /📂💫😎(\d+)_(.{1,32})$/
 */
const filenameRegex = new RegExp(
  `${FILEPATH_PREFIX}(\\d+)${FILEPATH_SEPARATOR}(.{1,${BASE64_CHUNK_LENGTH}})$`,
);

/**
 * Convert a buffer to an array of filenames.
 * 
 * @param   {object}    buffer  Buffer
 * @return  {[string]}          Filenames
 */
export const bufferToFilepaths = (buffer) => {
  const filepaths = [];
  let base64 = buffer.toString('base64');

  // index 0 is reserved for future use such as export metadata
  for (let i = 1; base64.length; i += 1) {
    const chunkLength = Math.min(base64.length, BASE64_CHUNK_LENGTH);
    const base64Chunk = base64.substring(0, chunkLength);
    filepaths.push(`${FILEPATH_PREFIX}${i}${FILEPATH_SEPARATOR}${base64Chunk}`);

    base64 = base64.substring(chunkLength);
  }

  return filepaths;
};

/**
 * Convert an array of filenames to a base64 string.
 * 
 * @param   {[string]}  filepaths  Filepaths
 * @return  {object}    buffer     Buffer
 */
export const filepathsToBuffer = (filepaths) => {
  const base64Array = [];

  filepaths.forEach((filepath) => {
    const match = filepath.match(filenameRegex);
    if (match.length === 3) {
      const [ , indexString, base64Chunk ] = match;
      const index = parseInt(indexString, 10);

      while (index > base64Array.length) {
        base64Array.push(null);
      }

      base64Array[index] = base64Chunk;
    }
  });

  let base64 = '';

  base64Array.forEach((base64Chunk, index) => {
    // index 0 is reserved for future use such as export metadata
    if (index === 0) {
      return;
    }

    if (base64Chunk === null) {
      throw new Error(`Missing base64 chunk`);
    }

    base64 += base64Chunk;
  });

  const buffer = Buffer.from(base64, 'base64');

  return buffer;
};