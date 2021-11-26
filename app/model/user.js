'use strict';

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const Model = app.model.define('user', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'UID（自增）'
        },
        email: {
            type: STRING(50),
            allowNull: false,
            comment: '邮箱'
        },
        nickname: {
            type: STRING(12),
            allowNull: false,
            unique: true,
            comment: '昵称'
        },
        loginpwd: {
            type: STRING,
            allowNull: false,
            comment: '登录密码'
        },
        salt: {
            type: STRING(20),
            allowNull: false,
            comment: '盐值'
        },
        loginpwdVersion: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '登录密码版本'
        },
        avatar: {
            type: STRING,
            allowNull: false,
            defaultValue: '/static/avatar/default.jpg',
            comment: '头像'
        },
        signature: {
            type: STRING,
            comment: '签名'
        }
    }, {
        initialAutoIncrement: 1000,
        comment: '用户表'
    });

    return Model;
};
