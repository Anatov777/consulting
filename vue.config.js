module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/consulting/' : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
