import fs from 'fs';
import path from 'path';
import stripComments from 'strip-comments';

const dirsToProcess = [
  'artifacts',
  'lib',
  'scripts'
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && !file.startsWith('.replit')) {
        processDirectory(fullPath);
      }
    } else {
      if (
        fullPath.endsWith('.ts') ||
        fullPath.endsWith('.tsx') ||
        fullPath.endsWith('.js') ||
        fullPath.endsWith('.jsx')
      ) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const stripped = stripComments(content);
        if (stripped !== content) {
          fs.writeFileSync(fullPath, stripped, 'utf8');
          console.log(`Stripped comments from ${fullPath}`);
        }
      }
    }
  }
}

for (const dir of dirsToProcess) {
  const fullDirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullDirPath)) {
    processDirectory(fullDirPath);
  }
}
console.log('Done stripping comments.');
