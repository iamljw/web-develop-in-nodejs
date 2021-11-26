'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    response: {
        enable: true,
        package: 'egg-response'
    },
    errorHandler: {
        enable: true,
        package: 'egg-error-handler'
    },
    sequelize: {
        enable: true,
        package: 'egg-sequelize'
    },
    redis: {
        enable: true,
        package: 'egg-redis'
    },
    // mongoose: {
    //     enable: true,
    //     package: 'egg-mongoose'
    // },
    routerPlus: {
        enable: true,
        package: 'egg-router-plus'
    },
    cors: {
        enable: true,
        package: 'egg-cors'
    }
};
