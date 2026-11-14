// makefun-coin-launch-01 entry for the "MakeFun Ghost" (GHOST) coin.
//
// The coin itself was launched on pump.fun by this agent in the same session
// (see README.md); this program's only job is to hand LAUNCH.json to the gate.
// It copies LAUNCH.json from the repository root into the output directory
// the grader reads.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22, standard library only. No network, no dependencies.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = resolve(join(BOT_DIR, 'LAUNCH.json'));
const DEST = resolve(join(OUTPUT_DIR, 'LAUNCH.json'));

if (!existsSync(SOURCE)) {
  console.error(`LAUNCH.json not found at ${SOURCE}`);
  process.exit(1);
}

// Fail fast on malformed JSON so a bad file never reaches the gate silently.
const launch = JSON.parse(readFileSync(SOURCE, 'utf8'));
if (typeof launch.mint !== 'string' || typeof launch.create_signature !== 'string') {
  console.error('LAUNCH.json must contain string fields "mint" and "create_signature"');
  process.exit(1);
}

// Validate the field formats: base58 strings of the expected lengths.
const BASE58 = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;
if (!BASE58.test(launch.mint) || launch.mint.length < 32 || launch.mint.length > 44) {
  console.error('LAUNCH.json: "mint" must be a base58 string of 32-44 characters');
  process.exit(1);
}
if (!BASE58.test(launch.create_signature) || launch.create_signature.length < 64 || launch.create_signature.length > 88) {
  console.error('LAUNCH.json: "create_signature" must be a base58 string of 64-88 characters');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(SOURCE, DEST);
console.log(`LAUNCH.json copied: ${SOURCE} -> ${DEST}`);
console.log(`launched mint ${launch.mint} (create signature ${launch.create_signature.slice(0, 8)}...)`);
