import AdmZip from 'adm-zip';
import fs from 'fs';
import { promisify } from 'util';

import { base64ToFilepaths } from './base64FilepathConversion.js';
import { errorMessages } from '../constants/index.js';

/**
 * Compress a file or folder.
 * 
 * @param  {string}  sourcePath       Source path
 * @param  {string}  destinationPath  Destination path
 */
export const compress = async (sourcePath, destinationPath) => {
  const zip = new AdmZip();

  let stat;
  try {
    stat = await promisify(fs.stat)(sourcePath);
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error(errorMessages.fileNotFound);
    }

    throw e;
  }

  if (stat.isFile()) {
    zip.addLocalFile(sourcePath);
  } else if (stat.isDirectory()) {
    zip.addLocalFolder(sourcePath);
  } else {
    throw new Error(errorMessages.pathNotFileOrDirectory);
  }

  const buffer = await new Promise(zip.toBuffer);

  const base64 = buffer.toString('base64');

  const filepaths = base64ToFilepaths(base64);
  console.log(filepaths);
};