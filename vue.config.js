const openInEditor = require('launch-editor-middleware')

module.exports = {
  //para PRODUCCION
  publicPath: process.env.NODE_ENV === 'production' ? '/sicfo/' : '/',

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  configureWebpack: {
    devServer: {
      before(app) {
        app.use('/__open-in-editor', openInEditor('code'))
      },
    },
  },

  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'S.C.T'
      return args
    })
  },
}
