import * as React from 'react';
import { Route, Switch } from 'react-router';
import MainPage from './components/mainpage/MainPage';
import SearchPage from './components/searchpage/SearchPage';
import ViewPage from './components/viewpage/ViewPage';


export default (
    <Switch>
        <Route path='/series/' component={ViewPage} />
        <Route path='/search/' component={SearchPage} />
        <Route path='/' component={MainPage} />
    </Switch>
);