/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from 'features/dashboard/Dashboard'
import Settings from 'features/settings/Settings'
import NotFound from 'components/common/NotFound';
import Forbidden from 'components/common/Forbidden';
import ParticipantsListContainer from 'features/Participants/components/ParticipantsListContainer';

export default (
    <Switch>
        <Route exact path="/participants" component={ParticipantsListContainer} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/settings" component={Settings} />
        <Redirect exact from="/" to="/dashboard" />
        <Route exact path="/forbidden" component={Forbidden} />
        <Route render={() => <NotFound title="PageNotFound"></NotFound>} />
    </Switch>
);