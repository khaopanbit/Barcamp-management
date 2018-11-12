import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Speaker from './Speaker';
import Attendee from './Attendee'

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/speaker' component={Speaker} />\
                <Route exact path='/attendee' component={Attendee} />
            </Switch>
        </div>
    </BrowserRouter>
, document.getElementById('root'));
