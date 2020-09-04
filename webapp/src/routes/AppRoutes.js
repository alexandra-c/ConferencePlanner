/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Welcome from 'features/welcome/Welcome'
import Settings from 'features/settings/Settings'
import NotFound from 'components/common/NotFound';
import Forbidden from 'components/common/Forbidden';
import { useApolloLocalStorage } from 'hooks/apolloLocalStorage';
import { emailKey } from 'apollo/cacheKeyFunctions';
import ConferenceListContainer from 'features/conference/list/components/ConferenceListContainer';

const AppRoutes = (_props) => {
    const [{ email }] = useApolloLocalStorage(emailKey)

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
        <Redirect exact from="/" to="/welcome" />
        <Route exact path="/forbidden" component={Forbidden} />
        <Route render={() => <NotFound title="PageNotFound"></NotFound>} />
    </Switch>
    )
};

export default AppRoutes