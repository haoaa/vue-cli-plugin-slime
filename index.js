
let path = require('path')
module.exports = (api, options) => {
  const rawArgv = process.argv.slice(2)
  const args = require('minimist')(rawArgv)

  //Modifying webpack config
  api.chainWebpack(webpackConfig => {
    webpackConfig
        .entry('index')
        .add(path.resolve(api.service.context, `src/project/${args.project}/main.ts`))
        .end()
        .output
        .path(path.resolve(api.service.context, `dist/${args.project}`)) // 2
        .publicPath(`/newoffline/${args.project}`) // 1
    console.log(webpackConfig.toConfig())

    options.outputDir = `dist/${args.project}` // 2
    options.baseUrl = `/newoffline/${args.project}` // 1
    options.devServer.port = args.port
    void 0
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
