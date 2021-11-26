'use strict';

const { BaseController } = require('tic-lib').context;

class UserController extends BaseController {
    // 注册
    async register() {
        const { ctx, service } = this;
        const { email, nickname, loginpwd } = ctx.request.body;
        await service.user.register(email, nickname, loginpwd);
        ctx.successful('ok', { isData: false });
    }
    // 登录
    async login() {
        const { ctx, service } = this;
        const { email, loginpwd } = ctx.request.body;
        const data = await service.user.login(email, loginpwd);
        ctx.successful(data);
    }
    // 登出
    async logout() {
        const { ctx } = this;
        ctx.cookies.set('_token', null);
        ctx.successful('ok', { isData: false });
    }
    // 更新登录密码
    async updateLoginpwd() {
        const { ctx, service } = this;
        const { oldLoginpwd, newLoginpwd } = ctx.request.body;
        await service.user.updateLoginpwd(oldLoginpwd, newLoginpwd);
        ctx.successful('ok', { isData: false });
    }
}

module.exports = UserController;
