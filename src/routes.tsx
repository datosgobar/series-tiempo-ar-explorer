import * as React from 'react';
import { Route, Switch } from 'react-router';
import MainPage from './components/mainpage/MainPage';
import SearchPage from './components/searchpage/SearchPage';


export default (
    <Switch>
        <Route path='/search/:q' component={SearchPage} />
        <Route path='/' component={MainPage} />
    </Switch>
);