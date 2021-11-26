/* eslint valid-jsdoc: "off" */

'use strict';

const { dateFormat } = require('tic-lib');
const {
    clientError: { ClientError },
    resourceError: { ResourceError }
} = require('tic-lib');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1629615955055_8966';

    // add your middleware config here
    config.middleware = ['verifyTokenSilence'];

    // add your user config here
    const userConfig = {
        cluster: {
            listen: {
                port: 8880,
                hostname: '0.0.0.0'
            }
        },
        // sequelize
        sequelize: {
            dialect: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: '123456',
            charset: 'utf8mb4',
            database: 'web-develop-in-nodejs',
            define: {
                freezeTableName: true,
                paranoid: false,
                hooks: {
                    afterFind: dateFormat
                }
            },
            pool: {
                min: 2,
                max: 3,
                acquire: 30000,
                idle: 10000
            },
            timezone: '+08:00',
            logging: false
        },
        redis: {
            client: {
                port: 6379, // Redis port
                host: '127.0.0.1', // Redis host
                password: null,
                db: 0
            }
        },
        // mongoose: {
        //     client: {
        //         url: 'mongodb://localhost/wdin',
        //         options: {},
        //         // mongoose global plugins, expected a function or an array of function and options
        //         plugins: []
        //     }
        // },
        httpclient: {
            request: {
                // 默认 request 超时时间
                timeout: 1000 * 5
            }
        },
        // myAppName: 'egg',
        bodyParser: {
            formLimit: '2mb',
            jsonLimit: '2mb',
            textLimit: '2mb'
        },
        cors: {
            origin: '*',
            allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
        },
        security: {
            csrf: {
                enable: false,
                ignoreJSON: true
            },
            domainWhiteList: ['', '127.0.0.1', '0.0.0.0']
        },
        secret: 'Dpo123dHe5wkaAbIz1PPaEZKPiAbUXat',
        // egg-error-handler
        errorHandler2: {
            protection: true,
            tips: '系统繁忙或者正在维护中，请稍后重试',
            ignore: [ClientError, ResourceError]
        }
    };

    return {
        ...config,
        ...userConfig
    };
};
