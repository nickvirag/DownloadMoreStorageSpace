export * from './api/index.js';

import { runUI } from './console/index.js';

const main = async () => {
  try {
    await runUI();
  } catch (e) {
    console.error(`😡😡😡 Error! ${e.message}`);
  }
};

if (require.main === module) {
  main();
}