var path = require('path');
module.exports = {
    entry: './es6/index.js',
    output: {
        path: __dirname,
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'es6'),
                loader: 'babel',
                query: {
                    jsxPragma: 'dom',
                    optional: [ 'runtime' ],
                    stage: 0
                }
            }
        ]
    }
};
