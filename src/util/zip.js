import AdmZip from 'adm-zip';
import fs from 'fs';
import tmp from 'tmp-promise';
import { promisify } from 'util';

import { errorMessages } from '../constants/index.js';

export const zip = async (path) => {
  const admZip = new AdmZip();

  let stat;
  try {
    stat = await promisify(fs.stat)(path);
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error(errorMessages.fileNotFound);
    }

    throw e;
  }

  if (stat.isFile()) {
    admZip.addLocalFile(path);
  } else if (stat.isDirectory()) {
    admZip.addLocalFolder(path);
  } else {
    throw new Error(errorMessages.pathNotFileOrDirectory);
  }

  const buffer = await new Promise(admZip.toBuffer);

  return buffer;
};

export const unzip = async (
  buffer,
  destinationPath,
  options={ shouldOverwrite: false },
) => {
  const shouldOverwrite = options.shouldOverwrite || false;

  const {
    path: zipFilepath,
    cleanup,
  } = await tmp.file();

  try {
    await promisify(fs.write)(zipFilepath, buffer, 0, buffer.length);

    const admZip = new AdmZip(zipFilepath);
    admZip.extractAllTo(destinationPath, shouldOverwrite);
  } finally {
    cleanup();
  }
};