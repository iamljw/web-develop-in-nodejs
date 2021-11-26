'use strict';

const crypto = require('crypto');
const randomString = require('random-string');

module.exports = {
    /**
     * 加密
     * @param {*} content 内容
     * @param {*} salt 盐
     * @param {*} algorithm 算法
     */
    hmac(content, salt, algorithm = 'sha1') {
        const hmac = crypto.createHmac(algorithm, salt);
        hmac.update(content);
        return hmac.digest('hex');
    },
    /**
     * 按长度生成随机字符串
     * @param {*} length 长度
     */
    randStr(length = 6) {
        return randomString({ length });
    }
};
