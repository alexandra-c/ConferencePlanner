/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Welcome from 'features/welcome/Welcome'
import NotFound from 'components/common/NotFound';
import Forbidden from 'components/common/Forbidden';
import ConferenceListContainer from 'features/conference/list/components/ConferenceListContainer';
import MyConferenceListContainer from 'features/myConference/list/components/MyConferenceListContainer';
import MyConferenceContainer from 'features/myConference/edit/components/ConferenceContainer';

import { useEmail } from 'hooks/useEmail';
import HelloWorld from 'features/helloWorld/HelloWorld';

const AppRoutes = (_props) => {
    const [email] = useEmail()

    if (!email) {
        return <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <Redirect to="/welcome" />
        </Switch>
    }

    return (<Switch>
        <Route exact path="/helloWorld" component={HelloWorld} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/conferences" component={ConferenceListContainer} />
        <Route exact path="/myConferences" component={MyConferenceListContainer} />
        <Route exact path="/myConferences/:id(\d+)" component={MyConferenceContainer} />
        <Route exact path="/myConferences/:id(new)" component={MyConferenceContainer} />
        <Redirect exact from="/" to="/welcome" />
        <Route exact path="/forbidden" component={Forbidden} />
        <Route render={() => <NotFound title="PageNotFound"></NotFound>} />
    </Switch>
    )
};

export default AppRoutes