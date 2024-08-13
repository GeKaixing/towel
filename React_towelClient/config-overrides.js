
/* global module */
module.exports = function override(config) {
  // 添加自定义规则
  config.module.rules.push({
    test: /\.md$/,
    type: 'asset/source',
  });

  return config;
};
