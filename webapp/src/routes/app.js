/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from 'features/dashboard/Dashboard'
import Settings from 'features/settings/Settings'
import NotFound from 'components/common/NotFound';
import Forbidden from 'components/common/Forbidden';
import ConferenceContainer from 'features/organizers/edit/components/ConferenceContainer';

export default (
    <Switch>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/myconferences/:id(\d+)" component={ConferenceContainer} />
        <Route exact path="/myconferences/:id(new)" component={ConferenceContainer} />
        <Route exact path="/settings" component={Settings}/>
        <Redirect exact from="/" to="/dashboard" />
        <Route exact path="/forbidden" component={Forbidden} />
        <Route render={() => <NotFound title="PageNotFound"></NotFound>} />
    </Switch>
);