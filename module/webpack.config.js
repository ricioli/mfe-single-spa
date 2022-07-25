const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'mfe',
    projectName: 'module',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  });
};
