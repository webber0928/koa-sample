const errorFormat = require(`../../../errorHandler/errorFormat.json`);

module.exports = async (ctx) => {
  try {
    return (ctx.body = ctx.formatApi({
      data: {
        errorFormat,
      },
    }));
  } catch (err) {
    return ctx.throw(err);
  }
};
