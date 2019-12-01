import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import { promisify } from 'util';

import { isAccessible, unzip, zip } from '../util/index.js';
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
  await unzip(buffer, destinationPath, { shouldOverwriteOutput });
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
  
  const isDestinationAccessible = await isAccessible(destinationPath);
  if (isDestinationAccessible) {
    if (shouldOverwriteOutput) {
      await promisify(rimraf)(destinationPath);
    }
  }

  await promisify(fs.mkdir)(destinationPath);

  for (let i = 0; i < filepaths.length; i += 1) {
    const filepath = filepaths[i];
    const descriptor =
      await promisify(fs.open)(path.join(destinationPath, filepath), 'w');
    await promisify(fs.close)(descriptor);
  }
};