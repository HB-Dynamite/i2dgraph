const path = require('path');

module.exports = {
    entry: './src/lib/components/TestApp.js', // Replace with the path to your React test file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        static: path.join(__dirname, 'public'), // Serve static files from 'public' directory
        compress: true,
        port: 3000, // Use port 3000 for the dev server
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Resolve JavaScript and JSX files
    },
};
