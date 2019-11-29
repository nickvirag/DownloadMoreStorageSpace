import minimist from 'minimist';

export const supportedArgs = [
  {
    args: ['-h', '--help'],
    description: 'Show help information',
  },
  {
    args: ['-c', '--compress'],
    description: 'Compress input filepath',
  },
  {
    args: ['-e', '--extract'],
    description: 'Extract input filepath',
  },
  {
    args: ['-i=', '--input='],
    description: 'Input filepath',
  },
  {
    args: ['-o=', '--output='],
    description: 'Output filepath',
  },
];

export const processArgs = () => {
  const args = minimist(process.argv);

  // Remove node and module path from unnamed args
  const unnamedArgs = args._.splice(2);

  const inputFilepath =
    args.i ||
    args.input ||
    (unnamedArgs.length ? unnamedArgs[0] : null);

  const outputFilepath =
    args.o ||
    args.output ||
    (unnamedArgs.length > 1 ? unnamedArgs[1] : null);

  const help = args.h || args.help || false;

  const compress = args.c || args.compress || false;

  const extract = args.e || args.extract || false;

  const options = {
    compress,
    extract,
    inputFilepath,
    help,
    outputFilepath,
  };

  return options;
};