module.exports = {
  presets: [
    ['@babel/preset-env', process.env.TARGET === 'es' ? { loose: true, modules: false } : {}],
    '@babel/preset-react',
  ],
};
