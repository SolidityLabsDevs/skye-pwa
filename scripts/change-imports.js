/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// const barrelImportsRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*["']([^"']+)["']/gm;
const barrelImportsRegex =
  /^(?!\s*(\/\/|\/\*|\*)).*import\s*{\s*([^}]+)\s*}\s*from\s*["'](components\/[^"']+)["']/gm;

function findFiles(dir, ext, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      findFiles(fullPath, ext, files);
    } else if (fullPath.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

function componentExists(importPath, componentName) {
  const p = path.resolve(path.join(process.cwd()));

  const possiblePaths = [
    path.join(p, `${importPath}/${componentName}.js`),
    path.join(p, `${importPath}/${componentName}.ts`),
    path.join(p, `${importPath}/${componentName}.tsx`),
    path.join(p, `${importPath}/${componentName}/index.js`),
    path.join(p, `${importPath}/${componentName}/index.ts`),
    path.join(p, `${importPath}/${componentName}/index.tsx`),
  ];

  const exists = possiblePaths.some(fs.existsSync);
  return exists;
}

function updateImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // const updatedContent = content.replace(barrelImportsRegex, (match, imports, importPath) => {
  // Only modify imports from "components/*"
  // if (!importPath.startsWith('components/')) return match;
  // if (importPath.split('/').length > 2) return match;
  const updatedContent = content.replace(barrelImportsRegex, (match, _, imports, importPath) => {
    if (importPath.split('/').length > 2) return match;

    const importList = imports
      .split(',')
      .map(component => component.trim())
      .filter(Boolean); // Remove empty entries

    if (importList.length === 0) return match; // No valid components found, skip replacement

    const newImports = importList
      .map(component => {
        if (componentExists(importPath, component)) {
          return `import { ${component} } from '${importPath}/${component}'`.replaceAll(
            `/${component}`,
            `/${component}`
          );
        } else {
          return `import { ${component} } from '${importPath}'`;
        }
      })
      .join('\n');

    modified = true;
    return newImports;
  });

  if (modified) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✅ Updated imports in: ${filePath}`);
  }
}

function processProject() {
  const jsFiles = findFiles(path.resolve(path.join(process.cwd(), 'app')), '.tsx').concat(
    findFiles(path.resolve(path.join(process.cwd(), 'components')), '.tsx')
  );
  jsFiles.forEach(updateImportsInFile);
  console.log('Processing complete!');
}

processProject();
