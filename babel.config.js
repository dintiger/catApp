module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",

        {
          alias: {
            "@/src": "./src",
            "@/components": "./src/components",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
