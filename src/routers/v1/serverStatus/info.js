module.exports = async (ctx) => {
  try {
    ctx.status = 200;
    return (ctx.body = ctx.formatApi({
      data: {
        version: "investor v1 api",
      },
    }));
  } catch (err) {
    return ctx.throw(err);
  }
};
