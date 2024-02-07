module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module-resolver",
      {
        alias: {
          crypto: "react-native-quick-crypto",
          stream: "stream-browserify",
        },
      },
    ],
  ],
};
