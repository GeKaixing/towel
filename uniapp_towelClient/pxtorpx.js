const postcss = require('postcss');
 
module.exports = postcss.plugin('postcss-px-to-rpx', opts => {
    opts = opts || {};
    const pxUnit = opts.pxUnit || 1; // 1px等于多少rpx
 
    return function (root) {
        root.walkDecls(decl => {
            decl.value = decl.value.replace(/(\d+(\.\d+)?)(px)/g, function (match, number) {
                return (parseFloat(number) / pxUnit) + 'rpx';
            });
        });
    };
});