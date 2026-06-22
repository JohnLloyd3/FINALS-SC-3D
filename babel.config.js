module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        helpers: true,
        regenerator: true,
        version: '^7.24.0'
      }]
    ]
  };
};