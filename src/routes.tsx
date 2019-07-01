import * as React from 'react';
import { Route, Switch } from 'react-router';
import ExportablePage from './components/exportable/ExportablePage';
import MainPage from './components/mainpage/MainPage';
import SearchPage from './components/searchpage/SearchPage';
import ViewPage from './components/viewpage/ViewPage';
import { env } from 'process';


export default (
    <Switch>
        {(env.NODE_ENV === 'development') &&
        <Route path='/series/' component={ViewPage} />}
        <Route path='/search/' component={SearchPage} />
        <Route path='/components/' component={ExportablePage} />
        <Route path='/' component={MainPage} />
    </Switch>
);