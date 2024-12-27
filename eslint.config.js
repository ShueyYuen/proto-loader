import antfu from '@antfu/eslint-config'

export default antfu(
  {},
  {
    files: ['**/*.d.ts'],
    rules: {
      'node/prefer-global/buffer': 'off',
    },
  },
)
