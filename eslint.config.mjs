import react from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/out', '**/build', '**/public', '**/node_modules', '**/protected'],
  },
  ...compat.extends(
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended'
  ),
  {
    plugins: {
      react,
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      'react/jsx-key': 'error',
      '@typescript-eslint/no-explicit-any': ['off', {}],

      'react/display-name': [
        'off',
        {
          ignoreTranspilerName: true,
        },
      ],

      '@typescript-eslint/no-unused-expressions': 'off',
      'import/no-anonymous-default-export': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@next/next/no-html-link-for-pages': [2, './'],
    },
  },
];
