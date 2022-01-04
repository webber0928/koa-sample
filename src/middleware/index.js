// import bodyParser from "koa-bodyparser";
const net = require("net");
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const morgan = require("koa-morgan");
const address6 = require("ip-address").Address6;

module.exports = (app) => {
  app.use(
    morgan("dev", {
      skip: () => app.env === "test",
    })
  );

  // 取得 ip
  app.use(async (ctx, next) => {
    let ip = ctx.request.ip;
    const isIpv4 = net.isIPv4(ip);
    const isIpv6 = net.isIPv6(ip);

    if (isIpv4 === true) {
      ctx.state.clientIp = ip;
      return next();
    }

    if (isIpv6 === true) {
      let { address } = new address6(ip).to4();
      ctx.state.clientIp = address;
      return next();
    }

    ctx.state.clientIp = ctx.request.ip;
    return next();
  });

  // 判斷國家
  app.use(async (ctx, next) => {
    const country_code = ctx.headers["cf-ipcountry"]
      ? ctx.headers["cf-ipcountry"]
      : null;
    console.log(`country_code = ${country_code}`); // eslint-disable-line no-console
    return next();
  });

  app.use(
    koaBody({
      multipart: true,
    })
  );
  // body 擇一
  // app.use(
  //   bodyParser({
  //     enableTypes: ["json", "form"],
  //     formLimit: "10mb",
  //     jsonLimit: "10mb",
  //   })
  // );

  app.use(
    cors({
      origin: () => {
        return "*";
      },
      credentials: true,
    })
  );

  app.context.formatApi = (options = {}) => {
    let { code = 200, data = {}, status = 200 } = options;
    return {
      code,
      data,
      status,
    };
  };

  return async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) {
        ctx.throw(404);
      }
      // return next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        statusCode: ctx.status,
        message: err.message,
      };
      ctx.app.emit("error", err, ctx);
    }
  };
};
