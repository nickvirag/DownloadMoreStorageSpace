import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { supportedArgs, processArgs } from './args.js';
import { prompt } from './readline.js';
import { compress, expand } from '../api/index.js';
import { errorMessages } from '../constants/index.js';

/**
 * Create a default output filepath from an input filepath.
 *
 * @param   {string}  inputFilepath  Input filepath
 * @return  {string}                 Default output filepath
 */
const createDefaultOutputFilepath = (inputFilepath, mode) => {
  const filepath = path.dirname(inputFilepath);
  const filename =
    `${path.basename(inputFilepath)}_${
      mode === 'compress' ? 'compressed' : 'expanded'
    }`;

  return path.join(filepath, filename);
}

export const runUI = async () => {
  console.log('Welcome to the storage space creator 📂💫😎');

  const args = processArgs();

  if (args.help) {
    console.log(
      'Usage:\n\tnpm run main -- [input] [output] [--compress|--expand] [--help]\n',
    );
    console.log('Arguments:');
    supportedArgs.forEach(({ args, description }) => {
      console.log(`\t${args.join(', ')}: ${description}`);
    });

    return;
  }

  if (args.compress && args.expand) {
    throw new Error(errorMessages.conflictingArgs);
  }

  if (!args.compress && !args.expand) {
    throw new Error(errorMessages.missingArgs);
  }

  const mode = args.compress ? 'compress' : 'expand';

  let inputFilepath = args.inputFilepath;
  while (!inputFilepath) {
    inputFilepath = await prompt('Enter input filepath: ');
  }

  let outputFilepath =
    args.outputFilepath || createDefaultOutputFilepath(inputFilepath, mode);

  if (!args.overwriteOutput) {
    const isOutputExists = await promisify(fs.access)(outputFilepath);
    if (isOutputExists) {
      const shouldOverwriteOutputUserInput = await prompt(
        `Output filepath ${outputFilepath} exists. Overwrite file? [y/n]: `,
      );
      if (shouldOverwriteOutputUserInput.toLowerCase() !== 'y') {
        throw new Error(errorMessages.cannotOverwriteOutputFilepath);
      }
    }
  }

  if (mode === 'compress') {
    console.log(`Compressing ${inputFilepath} to ${outputFilepath}`);
    await compress(
      inputFilepath,
      outputFilepath,
      { shouldOverwriteOutput: true },
    );
  } else {
    console.log(`Expanding ${inputFilepath} to ${outputFilepath}`);
    await expand(
      inputFilepath,
      outputFilepath,
      { shouldOverwriteOutput: true },
    );
  }
};
