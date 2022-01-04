
const errorFormat = require(`./errorFormat`);
const PrettyError = require('pretty-error');
const prettyError = new PrettyError();
prettyError.withoutColors();
prettyError.skipPackage(
    'koa-compose',
    'koa-router',
    'koa2-cors',
    'koa-body',
    'koa-logger',
    'jsonwebtoken',
    'bluebird'
);

module.exports = () => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            let errorResponse = {};
            const customizedError = errorFormat[err.message] ? true : false;
            let customError = customizedError ? errorFormat[err.message] : errorFormat['2000'];
            errorResponse.code = customError.code;
            errorResponse.status = customError.status;
            errorResponse.message = customError.message;

            if (customError.code >= 1000) {
                console.log(`---------- ERROR ----------`); // eslint-disable-line no-console
                console.log(`code: ${errorResponse.code}`); // eslint-disable-line no-console
                console.log(`message: ${errorResponse.message}`); // eslint-disable-line no-console
                console.log(`status: ${errorResponse.status}`); // eslint-disable-line no-console
                console.log(`stack:`); // eslint-disable-line no-console
                console.log(prettyError.render(err)); // eslint-disable-line no-console
                console.log(`---------- ERROR ----------`); // eslint-disable-line no-console
            }

            ctx.status = errorResponse.status;
            return ctx.body = errorResponse;
        }
    };
};