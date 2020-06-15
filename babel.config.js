module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
    development: {
      plugins: [['babel-plugin-react-native-config', { envfile: '.env' }]],
    },
  },
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'transform-throw-expressions',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~components': './src/components',
          '~validations': './src/validations',
          '~constants': './src/constants',
          '~colors': './src/constants/colors',
          '~store': './src/store',
          '~reducers': './src/store/reducers',
          '~views': './src/views',
          '~services': './src/services',
          '~router': './src/router',
          '~assets': './src/assets',
          '~images': './src/assets/images',
          '~animations': './src/assets/animations',
          '~config': './src/config',
        },
      },
    ],
  ],
};
