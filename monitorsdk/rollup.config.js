const babel = require('@rollup/plugin-babel')
const path = require('path')

module.exports = {

  input: 'src/index.js',
  output: {
    file: path.resolve(__dirname, '../website/client/bundle.js'),
    format: 'umd', // 兼容amd commonjs和全局变量三种方式
  },

  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**', // 排除 node_modules 目录
      babelHelpers: 'bundled', // 使用 Rollup 打包后的辅助函数
      presets: [
        [
          '@babel/preset-env',
          {
            // targets: '> 0.5%, last 2 versions, Firefox ESR, not dead'
          }
        ]
      ]
    }),
    // 其他插件...
  ]
}