const path = require('path');
module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        const dir = path.resolve(__dirname, 'src/assets/icon');
        config.module
            .rule('svg-sprite')
            .test(/\.svg$/)
            .include.add(dir).end() // 包含 icon 目录
            .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract: false}).end()
            .use('svgo-loader').loader('svgo-loader') //优化svg的loader
            .tap(options =>({ ...options, plugins:[{removeAttrs:{attrs:'fill'}}]})).end(); //默认删除svg path里fill属性
        config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{plainSprite: true}]);
        config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icon 目录
    }
};