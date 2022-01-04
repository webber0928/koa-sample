import koa from 'koa';

const app = new koa();

const errorHandler = require(`./errorHandler`);
const middleware = require(`./middleware`);
const routers = require(`./routers`);

app.proxy = true;

// Routes
app.use(errorHandler());
app.use(middleware(app));
app.use(routers(app));

export default app;
