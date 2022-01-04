const Router = require("koa-router");
const router = new Router({
  prefix: "/apis/v2",
});

/*
 * Server Status
 */
router.get("/serverstatus/info", require(`./serverStatus/info`));

module.exports = router;
