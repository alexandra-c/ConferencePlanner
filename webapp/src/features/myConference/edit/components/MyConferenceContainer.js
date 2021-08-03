import React, { useReducer, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useToast } from 'hooks/toasts';
import { useHeader } from 'providers/AreasProvider';
import { reducer, initialConference } from '../conferenceState';
import { useEmail } from 'hooks/useEmail';
import { LoadingFakeText } from '@bit/totalsoft_oss.react-mui.kit.core';
import MyConferenceHeader from './MyConferenceHeader';
import MyConference from './MyConference';

import { CONFERENCE_QUERY } from '../queries/ConferenceQuery';
import { UPDATE_CONFERENCE } from '../mutations/UpdateConference'

const MyConferenceContainer = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const match = useRouteMatch();
    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';
    const addToast = useToast();
    const [, setHeader] = useHeader();
    const [organizerEmail] = useEmail();
    const [localConference, dispatch] = useReducer(reducer, initialConference)

    const { loading, data } = useQuery(CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: data => data?.conference && dispatch({ type: 'resetData', payload: data?.conference }),
        onError: error => addToast(error, 'error', false)
    });

    const [updateConference, { loading: saving }] = useMutation(UPDATE_CONFERENCE,
        {
            onCompleted: result => {
                addToast(t('MyConferences.SavingSucceeded'), 'success')

                if (isNew) {
                    history.push(`/myConferences/${result?.saveConference?.id}`);
                    return;
                }

                result?.saveConference && dispatch({ type: 'resetData', payload: result?.saveConference })
            }
        })

    // eslint-disable-next-line 
    useEffect(() => () => setHeader(null), []);

    const handleSave = useCallback(() => {
        const { id, name, startDate, endDate, deletedSpeakers, type, category, location, speakers } = localConference;
        const { city, county, country, ...locationData } = location
        const input = {
            id, name, startDate, endDate, deletedSpeakers, type, category,
            location: {
                ...locationData,
                cityId: city.id,
                countyId: county.id,
                countryId: country.id
            },
            speakers,
            organizerEmail
        }
        updateConference({ variables: { input } })
    }, [localConference, organizerEmail, updateConference])

    useEffect(() => {
        setHeader(
            <MyConferenceHeader
                headerText={localConference.name}
                onSave={handleSave}
                saving={saving}
            />
        )
    }, [handleSave, localConference.name, saving, setHeader])

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