const Router = require("koa-router");
const router = new Router({
  prefix: "/apis/v1",
});

/*
 * Server Status
 */
router.get("/serverstatus/info", require(`./serverStatus/info`));

/*
 * Error Format
 */
router.get("/errorcode/format", require(`./errorCode/format`));

module.exports = router;
