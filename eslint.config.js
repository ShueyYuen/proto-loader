import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  {
    ignores: ['**/*_pb.js', '**/google-protobuf.js'],
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'node/prefer-global/buffer': 'off',
    },
  },
  {
    files: ['**/__tests__/**/*'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
)
