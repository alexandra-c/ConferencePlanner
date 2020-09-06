import React, { useReducer } from 'react';
import MyConference from './MyConference';
import { useRouteMatch } from 'react-router-dom';
import { MY_CONFERENCE_QUERY } from '../queries/MyConferenceQuery';
import { useQuery } from '@apollo/client';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import { useToast } from 'hooks/toasts';
import { reducer, initialConference } from '../conferenceState';

const MyConferenceContainer = () => {
    const match = useRouteMatch();
    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';
    const addToast = useToast();
    const [localConference, dispatch] = useReducer(reducer, initialConference)

    const { loading, data } = useQuery(MY_CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: data => data?.myConference && dispatch({ type: 'resetData', payload: data?.myConference }),
        onError: error => addToast(error, 'error', false)
    });

    if (loading) {
        return <LoadingFakeText lines={10} />;
    }

    return (
        <MyConference
            conference={localConference}
            dispatch={dispatch}
            types={data?.typeList}
            categories={data?.categoryList}
            countries={data?.countryList}
            counties={data?.countyList}
            cities={data?.cityList}
        />
    );
}

export default MyConferenceContainer;