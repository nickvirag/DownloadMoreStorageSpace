import { supportedArgs, processArgs } from './args.js';
import { prompt } from './readline.js';
import { compress, extract } from '../lib/index.js';
import { createDefaultOutputFilepath } from '../util/index.js';

export const runUI = async () => {
  console.log('Welcome to the storage(📂) space(🌟) creator(‼️)');

  const args = processArgs();

  if (args.help) {
    console.log(
      'Usage:\n\tnpm run main -- [input] [output] [--compress|--extract] [--help]\n',
    );
    console.log('Arguments:');
    supportedArgs.forEach(({ args, description }) => {
      console.log(`\t${args.join(', ')}: ${description}`);
    });

    return;
  }

  if (args.compress && args.extract) {
    throw new Error('🤫');
  }

  if (!args.compress && !args.extract) {
    throw new Error('🤔');
  }

  const mode = args.compress ? 'compress' : 'extract';

  let inputFilepath = args.inputFilepath;
  while (!inputFilepath) {
    inputFilepath = await prompt('Enter input filepath: ');
  }

  let outputFilepath =
    args.outputFilepath || createDefaultOutputFilepath(inputFilepath, mode);

  if (mode === 'compress') {
    await compress(inputFilepath, outputFilepath);
  } else {
    await extract(inputFilepath, outputFilepath);
  }
};
