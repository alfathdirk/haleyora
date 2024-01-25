module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@utils': './src/utils',
          '@pages': './src/pages',
          '@hooks': './src/hooks/hook',
          '@stores': './src/stores',
          '@img': './src/assets',
          '@constants': './src/utils/constants',
        },
      },
    ],
  ],
};
