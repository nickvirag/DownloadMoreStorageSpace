import fs from 'fs';
import { promisify } from 'util';

/**
 * Get whether the specified path exists and is accessible.
 *
 * @param   {string}   filepath  Filepath
 * @return  {boolean}            Is filepath accessible
 */
export const isAccessible = async (filepath) => {
  try {
    await promisify(fs.access)(filepath);
    return true;
  } catch (e) {
    return false;
  }
};