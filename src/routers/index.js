/*
 * bundle investor API routers
 */

const v1 = require(`./v1`);
const v2 = require(`./v2`);

module.exports = (app) => {
    app.use(v1.routes());
    app.use(v1.allowedMethods());

    app.use(v2.routes());
    app.use(v2.allowedMethods());

    return async (ctx, next) => {
        try {
            return next();
        } catch (err) {
            return next(err);
        }
    };
};