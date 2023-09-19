const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

module.exports = async baseConfig => {
  const defaultConfig = mergeConfig(baseConfig, getDefaultConfig(__dirname));

  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();

  return mergeConfig(
    defaultConfig,
    {
      transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
      },
    },
    {
      resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
      },
    },
  );
};
