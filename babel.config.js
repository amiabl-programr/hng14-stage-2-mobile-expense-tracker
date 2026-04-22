module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@store': './src/store',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@services': './src/services',
          '@types': './src/types',
        }
      }]
    ]
  };
};