import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

/* import Index from './views/Index';*/
import NotFound from './views/NotFound';
import Data from './views/Data';

// All of our CSS
require('../public/css/main.scss');

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={Data} />
      <Route component={NotFound} status={404} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
