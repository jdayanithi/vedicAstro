const TerserPlugin = require('terser-webpack-plugin');

module.exports = (config, options) => {
  // Only apply console removal in production builds
  if (options.configuration === 'production') {
    if (!config.optimization) {
      config.optimization = {};
    }
    
    if (!config.optimization.minimizer) {
      config.optimization.minimizer = [];
    }
    
    // Add or replace Terser plugin with console removal configuration
    config.optimization.minimizer.push(
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: [
              'console.log', 
              'console.info', 
              'console.debug', 
              'console.warn',
              'console.group',
              'console.groupEnd',
              'console.groupCollapsed'
            ]
          },
          mangle: true,
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    );
  }
  
  return config;
};
