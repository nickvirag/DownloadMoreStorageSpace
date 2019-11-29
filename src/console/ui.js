import { supportedArgs, processArgs } from './args.js';
import { prompt } from './readline.js';
import { compress, expand } from '../lib/index.js';
import { createDefaultOutputFilepath } from '../util/index.js';
import { errorMessages } from '../constants/index.js';

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

  if (mode === 'compress') {
    await compress(inputFilepath, outputFilepath);
  } else {
    await expand(inputFilepath, outputFilepath);
  }
};
