import fs from 'fs';
import tmp from 'tmp';
import { promisify } from 'util';

import { unzip, zip } from '../util/index.js';
import { bufferToFilepaths, filepathsToBuffer } from './bufferConversion.js';

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

  const filepaths = await promisify(fs.readdir)(sourcePath);
  const buffer = filepathsToBuffer(filepaths);

  const unzipDestinationPath = await promisify(tmp.dir);
  await unzip(buffer, unzipDestinationPath);
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
  const filepaths = bufferToFilepaths(buffer);
  console.log(filepaths);
};