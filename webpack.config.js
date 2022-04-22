const path = require('path')

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}