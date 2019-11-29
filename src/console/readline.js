import readline from 'readline';

/**
 * Prompt the user for a value via stdin.
 *
 * @param   {string}  message  Prompt message
 * @return  {string}           User response
 */
export const prompt = (message) => new Promise((resolve) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readlineInterface.question(message, (input) => {
    readlineInterface.close();
    resolve(input);
  });
});