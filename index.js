// const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')

module.exports = (api, options) => {

  //Modifying webpack config
  api.chainWebpack(webpackConfig => {
    // webpackConfig
    //   .plugin('vue-auto-routing')
    //     .use(VueAutoRoutingPlugin, [
    //       {
    //         pages: 'src/pages',
    //         nested: true
    //       }
    //     ])
  })

  // Add a new cli-service command
  api.registerCommand(
    'greet',
    {
      description: 'Writes a greeting to the console',
      usage: 'vue-cli-service greet [options]',
      options: { '--name': 'specifies a name for greeting' }
    },
    args => {
      if (args.name) {
        console.log(`👋 Hello, ${args.name}!`);
      } else {
        console.log(`👋 Hello!`);
      }
    }
  );
  // vue-cli-service greet --name 'John Doe' => 👋 Hello, John Doe!

  // Modifying existing cli-service command
  const { serve } = api.service.commands

  const serveFn = serve.fn
  
  serve.fn = (...args) => {
    return serveFn(...args).then(res => {
      if (res && res.url) {
        console.log(`Project is running now at ${res.url}`)
      }
    })
  }
};
// default mode to loading environment variables
module.exports.defaultModes = {
  build: 'production'
}