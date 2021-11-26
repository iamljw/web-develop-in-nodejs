'use strict';

const { BaseService } = require('tic-lib').context;
const {
    resourceError: { NotFoundError },
    clientError: { ClientError }
} = require('tic-lib');
const jwt = require('jsonwebtoken');
const moment = require('tic-lib').moment.zhCN;

class CommonApiService extends BaseService {
    /**
     * 注册
     * @param {*} email 电子邮箱
     * @param {*} nickname 昵称
     * @param {*} loginpwd 密码
     */
    async register(email, nickname, loginpwd) {
        const { ctx } = this;
        const isDuplemail = await ctx.model.User.count({
            where: { email }
        });
        if (isDuplemail) {
            throw new ClientError(`邮箱 ${email} 已被占用`);
        }
        const isDupluname = await ctx.model.User.count({
            where: { nickname }
        });
        if (isDupluname) {
            throw new ClientError(`昵称 ${nickname} 已被占用`);
        }
        const salt = ctx.randStr();
        const encrypted = ctx.hmac(loginpwd, salt);
        await ctx.model.User.create({
            email,
            nickname,
            loginpwd: encrypted,
            salt
        });
    }
    /**
     * 登录
     * @param {*} email 电子邮箱
     * @param {*} loginpwd 密码
     */
    async login(email, loginpwd) {
        const { ctx, config } = this;
        const user = await ctx.model.User.findOne({
            where: {
                email
            },
            raw: true
        });
        if (!user) {
            throw new NotFoundError('该邮箱未注册');
        }
        const encrypted = ctx.hmac(loginpwd, user.salt);
        if (encrypted !== user.loginpwd) {
            throw new ClientError('密码错误');
        }
        const token = jwt.sign({
            uid: user.id,
            loginpwdVersion: user.loginpwdVersion,
            exp: moment().add(30, 'days').unix()
        }, config.secret);
        delete user.loginpwd;
        delete user.salt;
        ctx.cookies.set('_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30天
        });
        return {
            uinfo: user
        };
    }
    /**
     * 更新登录密码
     * @param {*} oldLoginpwd 原密码
     * @param {*} newLoginpwd 新密码
     */
    async updateLoginpwd(oldLoginpwd, newLoginpwd) {
        const { ctx, config } = this;
        const user = await this.getUserById(ctx.uid);
        const encrypted = ctx.hmac(oldLoginpwd, user.salt);
        if (encrypted !== user.loginpwd) {
            throw new ClientError('密码错误');
        }
        user.loginpwd = ctx.hmac(newLoginpwd, user.salt);
        await user.save();
        await user.increment('loginpwdVersion');
        const token = jwt.sign({
            uid: user.id,
            loginpwdVersion: user.loginpwdVersion,
            exp: moment().add(30, 'days').unix()
        }, config.secret);
        delete user.loginpwd;
        delete user.salt;
        ctx.cookies.set('_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30天
        });
    }
    async getUserById(id) {
        const { ctx } = this;
        const user = await ctx.model.User.findByPk(id);
        return user;
    }
}

module.exports = CommonApiService;
