// eslint.config.js

import loguxConfig from '@logux/eslint-config/ts'

export default [
  ...loguxConfig,
  {
    ignores: [
      'convert.js',
      '[a-z][a-z].js',
      'dvorak.js',
      'colemak.js',
      '**/errors.ts',
      '*.json',
      'dist/*',
      'test/*'
    ]
  },
  {
    files: ['index.js'],
    rules: {
      'node/global-require': 'off',
      'quotes': 'off'
    }
  }
]
