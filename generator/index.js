module.exports = (api, options) => {
  return
  // 虚区目标文件
  if (options.addExampleRoutes) {
    api.render('./template')
  }
  // 这里的option会合并到生成的package.json中
  api.extendPackage({
    devDependencies: {
      'vue-router-layout': '^0.1.2',
      'vue-auto-routing': '*'
    }
  })
  api.injectImports(api.entryFile, `import router from '../router'`)
  // 模板写到磁盘后
  api.onCreateComplete(() => {
    const { EOL } = require('os')
    const fs = require('fs')
    const contentMain = fs.readFileSync(api.entryFile, { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g)

    const renderIndex = lines.findIndex(line => line.match(/render/))
    lines[renderIndex] += `${EOL}  router,`
    fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' })
  })
}