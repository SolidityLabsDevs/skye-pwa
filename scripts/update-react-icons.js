/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to check if the icon exists in @react-icons/all-files
const iconExists = iconPath => {
  try {
    require.resolve(iconPath);
    return true;
  } catch (e) {
    return false;
  }
};

// Function to process a single file
const processFile = filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let updatedContent = content;

  // Match import statements from react-icons
  const importRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*["']react-icons\/([^"']+)["'];?/g;

  updatedContent = updatedContent.replace(importRegex, (match, icons, iconSet) => {
    const iconList = icons
      .split(',')
      .map(icon => icon.trim())
      .filter(Boolean);
    const newImports = [];

    iconList.forEach(icon => {
      const newPath = `@react-icons/all-files/${iconSet}/${icon}`;
      if (iconExists(newPath)) {
        newImports.push(`import { ${icon} } from "${newPath}"`);
      } else {
        console.warn(`ℹ️ [SKIPPED] ${icon} not found in @react-icons/all-files`);
      }
    });

    return newImports.length > 0 ? newImports.join('\n') : match;
  });

  if (updatedContent !== content) {
    // fs.writeFileSync(filePath, updatedContent, "utf8");
    console.log(`✅ [UPDATED] ${filePath}`);
  }
};

// Function to recursively process files in a directory
const processDirectory = dir => {
  try {
    const files = glob.sync(`${dir}/**/*.{js,jsx,ts,tsx}`);
    files.forEach(file => processFile(file));
  } catch (_) {}
};

// Run the script on the project folder (change if needed)
const dir = path.join(process.cwd(), 'components');
processDirectory(dir);
const dir2 = path.join(process.cwd(), 'app');
processDirectory(dir2);
