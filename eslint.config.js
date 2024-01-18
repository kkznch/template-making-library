import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ['./dist'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts'],
        },
        typescript: {},
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
      import: pluginImport,
    },
    rules: {
      ...pluginTypeScript.configs['eslint-recommended'].rules,
      ...pluginTypeScript.configs['recommended'].rules,
      ...pluginImport.configs['recommended'].rules,
      'no-unused-vars': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '{react,react-dom/**,react-router-dom}',
              group: 'builtin',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'never',
        },
      ],

      /**
       * typescriptで同等のチェックがされているので、下記はオフにする
       * https://github.com/typescript-eslint/typescript-eslint/blob/1c1b572c3000d72cfe665b7afbada0ec415e7855/docs/getting-started/linting/FAQ.md#eslint-plugin-import
       */
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default': 'off',
    },
  },
];
