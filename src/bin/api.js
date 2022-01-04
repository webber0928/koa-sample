import config from 'config';
import app from '../app';

const { PORT = 8080 } = process.env;
app.listen(PORT, () => console.log(`*API* Start With '${config.get('mode')}' mode At ${PORT} Port`)); // eslint-disable-line no-console

