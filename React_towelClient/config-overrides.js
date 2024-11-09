
/* global module */
module.exports = function override(config) {
  // 添加自定义规则
  config.module.rules.push({
    test: /\.md$/,
    type: 'asset/source',
  });
 // 修改 resolve 配置
 config.resolve.extensions = ['.tsx']
  return config;
};
