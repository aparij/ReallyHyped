import React from 'react';
import history from './history'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './App';
import withTracker from './withTracker';


const Routes = () => (
    <Router history={history}>
        <Route exact path="/" component={withTracker(App)}/>
    </Router>
)


export default Routes
