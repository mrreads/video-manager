// vue.config.js

module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
};
