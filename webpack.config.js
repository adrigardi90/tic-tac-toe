const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

	resolve: {
        extensions: ['.js'],
    },

    entry: './src/index.js',

    output : {
        path: path.resolve(__dirname, 'dist'),
    	filename: 'bundle.js'
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
    },

    devtool: 'inline-source-map',

    module: {
    	rules: [
    		{
                test: /\.js?$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/,
               
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, 
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, 
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },

    	]
    },

    plugins: [

         new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'src/index.html'
        }),
    ]

}