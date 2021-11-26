'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => {
    return async (ctx, next) => {
        const token = ctx.cookies.get('_token');
        try {
            const { secret } = ctx.app.config;
            const payload = jwt.verify(token, secret);
            const user = await ctx.model.User.findOne({
                where: {
                    id: payload.uid
                },
                raw: true
            });
            if (payload.loginpwdVersion !== user.loginpwdVersion) {
                return;
            }
            ctx.uid = payload.uid;
            ctx.user = user;
        } catch (e) {
            ctx.cookies.set('_token', null);
        } finally {
            await next();
        }
    };
};
