/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Welcome from 'features/welcome/Welcome'
import Settings from 'features/settings/Settings'
import NotFound from 'components/common/NotFound';
import Forbidden from 'components/common/Forbidden';
import ConferenceListContainer from 'features/conference/list/components/ConferenceListContainer';
import ConferenceContainer from 'features/conference/edit/components/ConferenceContainer';

import { useEmail } from 'hooks/useEmail';

const AppRoutes = (_props) => {
    const [email] = useEmail()

    if (!email) {
        return <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <Redirect to="/welcome" />
        </Switch>
    }

    return (<Switch>
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/conferences" component={ConferenceListContainer} />
        <Route exact path="/myconferences" component={Settings} />
        <Route exact path="/myconferences/:id(\d+)" component={ConferenceContainer} />
        <Route exact path="/myconferences/:id(new)" component={ConferenceContainer} />
        <Redirect exact from="/" to="/welcome" />
        <Route exact path="/forbidden" component={Forbidden} />
        <Route render={() => <NotFound title="PageNotFound"></NotFound>} />
    </Switch>
    )
};

export default AppRoutes