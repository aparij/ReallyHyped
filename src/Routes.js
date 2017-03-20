import React from 'react';
import history from './history'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './App';


const Routes = () => (
    <Router history={history}>
        <Route exact path="/" component={App}/>
    </Router>
)


export default Routes
