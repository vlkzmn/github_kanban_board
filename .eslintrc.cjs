module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:@typescript-eslint/recommended-type-checked',
    `plugin:@typescript-eslint/stylistic-type-checked`,
    'plugin:react-hooks/recommended',
    `plugin:react/recommended`,
    `plugin:react/jsx-runtime`,
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
      flowVersion: '0.53',
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
      { property: 'forbidExtraProps', exact: true },
    ],
    componentWrapperFunctions: [
      'observer',
      { property: 'styled' },
      { property: 'observer', object: 'Mobx' },
      { property: 'observer', object: '<pragma>' },
    ],
    formComponents: [
      'CustomForm',
      { name: 'SimpleForm', formAttribute: 'endpoint' },
      { name: 'Form', formAttribute: ['registerEndpoint', 'loginEndpoint'] },
    ],
    linkComponents: [
      'Hyperlink',
      { name: 'MyLink', linkAttribute: 'to' },
      { name: 'Link', linkAttribute: ['to', 'href'] },
    ],
  },
};
