/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from 'features/dashboard/Dashboard'
import NotFound from 'components/common/NotFound';
import Forbidden from 'components/common/Forbidden';
import ConferenceListContainer from 'features/conference/list/components/ConferenceListContainer';
import MyConferenceListContainer from 'features/myConference/list/components/MyConferenceListContainer';

export default (
    <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/conferences" component={ConferenceListContainer} />
        <Route exact path="/myconferences" component={MyConferenceListContainer} />
        <Redirect exact from="/" to="/dashboard" />
        <Route exact path="/forbidden" component={Forbidden} />
        <Route render={() => <NotFound title="PageNotFound"></NotFound>} />
    </Switch>
);