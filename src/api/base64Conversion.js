const FILEPATH_PREFIX = '📂💫😎';
const FILEPATH_INDEX_SEPARATOR = '_';
const BASE64_CHUNK_LENGTH = 32;

/**
 * Convert a base64 string to an array of filenames.
 * 
 * @param   {string}    base64  Base64 string
 * @return  {[string]}          Filenames
 */
export const base64ToFilepaths = (base64) => {
  const filepaths = [];

  for (let i = 1; base64.length; i += 1) {
    const chunkLength = Math.min(base64.length, BASE64_CHUNK_LENGTH);
    const base64Chunk = base64.substring(0, chunkLength);
    filepaths.push(
      `${FILEPATH_PREFIX}${i}${FILEPATH_INDEX_SEPARATOR}${base64Chunk}`,
    );

    base64 = base64.substring(chunkLength);
  }

  return filepaths;
};

/**
 * Convert an array of filenames to a base64 string.
 * 
 * @param   {[string]}  filepaths  Filepaths
 * @return  {string}               Base64 string
 */
export const filepathsToBase64 = (filepaths) => {
  let base64 = '';
  return base64;
};