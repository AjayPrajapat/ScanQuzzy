module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@services': './src/services',
            '@store': './src/store',
            '@types': './src/types',
            '@hooks': './src/hooks',
            '@theme': './src/theme',
            '@i18n': './src/i18n',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
