// Hook into the Cypress preprocessor for TypeScript support

const webpack = require('@cypress/webpack-preprocessor')
const path = require('path')

module.exports = (on) => {
  const webpackOptions = {
    module: {
      rules: [
        {
          exclude: [/node_modules/],
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },
    resolve: {
      alias: {
        '@logrhythm/webui': path.resolve(__dirname, '../../src'),
      },
      extensions: ['.js', '.ts', '.tsx'],
    },
  }

  on('file:preprocessor', webpack({ webpackOptions }))
}
