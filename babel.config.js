module.exports = function (api) {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
