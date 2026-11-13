import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rollupNativePath = path.resolve(__dirname, '../node_modules/rollup/dist/native.js');

if (fs.existsSync(rollupNativePath)) {
  let content = fs.readFileSync(rollupNativePath, 'utf8');
  if (content.includes('const nativeModule = requireWithFriendlyError')) {
    content = content.replace(
      /const nativeModule = requireWithFriendlyError\([\s\S]*?\);/,
      `let nativeModule;\ntry {\n\tnativeModule = requireWithFriendlyError(existsSync(path.join(__dirname, localName)) ? localName : \`@rollup/rollup-\${packageBase}\`);\n} catch (_err) {\n\tnativeModule = require('@rollup/wasm-node/dist/native.js');\n}`
    );
    fs.writeFileSync(rollupNativePath, content, 'utf8');
    console.log('[CampusTrack] Successfully ensured cross-platform WASM fallback for Vite Rollup.');
  }
}
