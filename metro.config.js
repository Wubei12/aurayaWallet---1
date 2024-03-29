const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const config = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);

  const defaultSourceExts = [...sourceExts, "svg", "mjs", "cjs", "mp4"];

  return {
    resolver: {
      extraNodeModules: {
        assert: require.resolve("empty-module"), // assert can be polyfilled here if needed
        http: require.resolve("empty-module"), // stream-http can be polyfilled here if needed
        https: require.resolve("empty-module"), // https-browserify can be polyfilled here if needed
        os: require.resolve("empty-module"), // os-browserify can be polyfilled here if needed
        url: require.resolve("empty-module"), // url can be polyfilled here if needed
        zlib: require.resolve("empty-module"), // browserify-zlib can be polyfilled here if needed
        path: require.resolve("empty-module"),
        // crypto: require.resolve("react-native-quick-crypto"),
        // stream: require.resolve("readable-stream"),
      },

      assetExts: assetExts.filter((ext) => ext !== "svg"),

      sourceExts: process.env.TEST_REACT_NATIVE
        ? ["e2e.js"].concat(defaultSourceExts)
        : defaultSourceExts,
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  };
})();

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
