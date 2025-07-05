const webpack = require('webpack');

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Vendor libraries (node_modules)
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 20
        },
        // Angular framework
        angular: {
          test: /[\\/]node_modules[\\/](@angular)[\\/]/,
          name: 'angular',
          chunks: 'all',
          priority: 30
        },
        // Material UI
        material: {
          test: /[\\/]node_modules[\\/](@angular[\\/]material|@angular[\\/]cdk)[\\/]/,
          name: 'material',
          chunks: 'all',
          priority: 25
        },
        // RxJS
        rxjs: {
          test: /[\\/]node_modules[\\/](rxjs)[\\/]/,
          name: 'rxjs',
          chunks: 'all',
          priority: 25
        },
        // Ionic
        ionic: {
          test: /[\\/]node_modules[\\/](@ionic)[\\/]/,
          name: 'ionic',
          chunks: 'all',
          priority: 25
        },
        // Common/shared code
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true
        },
        // Default
        default: {
          minChunks: 2,
          priority: 1,
          reuseExistingChunk: true
        }
      }
    },
    // Runtime chunk optimization
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    // Define feature flags for better tree shaking
    new webpack.DefinePlugin({
      'ngDevMode': false, // Disable Angular dev mode checks in production
      'ngI18nClosureMode': false
    })
  ]
};
