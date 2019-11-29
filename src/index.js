export * from './console/index.js';
export * from './lib/index.js';

import { runUI } from './console/index.js';

if (require.main === module) {
  runUI();
}