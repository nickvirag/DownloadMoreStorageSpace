import fs from 'fs';
import tmp from 'tmp';
import { promisify } from 'util';

import { unzip, zip } from '../util/index.js';
import { base64ToFilepaths, filepathsToBase64 } from './base64Conversion.js';

/**
 * Expand a file or folder.
 * 
 * @param  {string}  sourcePath       Source path
 * @param  {string}  destinationPath  Destination path
 */
export const expand = async (
  sourcePath,
  destinationPath,
  options={ shouldOverwriteOutput: false },
) => {
  const shouldOverwriteOutput = options.shouldOverwriteOutput || false;

  const unzipDestinationPath = await promisify(tmp.dir);
  await unzip(sourcePath, unzipDestinationPath);

  const filepaths = await promisify(fs.readdir)(unzipDestinationPath);

  const base64 = filepathsToBase64(filepaths);
};

/**
 * Compress a file or folder.
 * 
 * @param  {string}  sourcePath       Source path
 * @param  {string}  destinationPath  Destination path
 */
export const compress = async (
  sourcePath,
  destinationPath,
  options={ shouldOverwriteOutput: false },
) => {
  const shouldOverwriteOutput = options.shouldOverwriteOutput || false;
  
  const buffer = await zip(sourcePath);
  const base64 = buffer.toString('base64');
  const filepaths = base64ToFilepaths(base64);
  
  console.log(filepaths);
};