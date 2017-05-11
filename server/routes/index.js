/* eslint-disable global-require */
import 'dotenv/config';
import reactApp from './views/app';
import getNurses from './api/nurses';
const routes = (app) => {

  /* example api route */
  app.get('/api/records', require('./api/records'));
  app.get('/api/nurses', getNurses);
  reactApp(app); // set up react routes
};

export default routes;
/* eslint-enable global-require */
