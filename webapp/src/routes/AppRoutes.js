/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import CustomRoute from '../components/routing/CustomRoute'
import ConferenceListContainer from 'features/conference/list/components/ConferenceListContainer';
import MyConferenceListContainer from 'features/myConference/list/components/MyConferenceListContainer';
import MyConferenceContainer from 'features/myConference/edit/components/MyConferenceContainer';
import HelloWorld from 'features/helloWorld/HelloWorld';
import Welcome from 'features/welcome/Welcome'

import { useEmail } from 'hooks/useEmail';
import { Forbidden, NotFound } from '@bit/totalsoft_oss.react-mui.kit.core'

const AppRoutes = (_props) => {
  const [email] = useEmail()

  if (!email) {
    return <Switch>
      <Route exact path="/welcome" component={Welcome} />
      <Redirect to="/welcome" />
    </Switch>
  }

  return (<Switch>
    <CustomRoute isPrivate={false} exact path="/helloWorld" component={HelloWorld} />
    <CustomRoute isPrivate={false} exact path="/welcome" component={Welcome} />
    <CustomRoute isPrivate={false} exact path="/conferences" component={ConferenceListContainer} />
    <CustomRoute isPrivate={false} exact path="/myConferences" component={MyConferenceListContainer} />
    <CustomRoute isPrivate={false} exact path="/myConferences/:id(\d+)" component={MyConferenceContainer} />
    <CustomRoute isPrivate={false} exact path="/myConferences/:id(new)" component={MyConferenceContainer} />
    <Redirect exact from="/" to="/welcome" />
    <CustomRoute isPrivate={false} exact path="/forbidden" component={Forbidden} />
    <CustomRoute isPrivate={false} render={() => <NotFound title="PageNotFound"></NotFound>} />
  </Switch>
  )
};

export default AppRoutes