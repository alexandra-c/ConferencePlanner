import React, { useReducer, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MyConference from './MyConference';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { MY_CONFERENCE_QUERY } from '../queries/MyConferenceQuery';
import { useQuery, useMutation } from '@apollo/client';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import { useToast } from 'hooks/toasts';
import { useHeader } from 'providers/AreasProvider';
import { reducer, initialConference } from '../conferenceState';
import MyConferenceHeader from './MyConferenceHeader';
import { UPDATE_CONFERENCE } from '../mutations/UpdateConference'
import { useEmail } from 'hooks/useEmail';

const transformLocationForSaving = ({ city, county, country, ...rest }) => (
    { ...rest, cityId: city.id, countyId: county.id, countryId: country.id }
)

const generateModelForSaving = conference => {
    const { id, name, startDate, endDate, deletedSpeakers, type, category, location, speakers } = conference;
    return {
        id, name, startDate, endDate, deletedSpeakers, type, category,
        location: transformLocationForSaving(location),
        speakers: speakers.map(({ id, name, isMainSpeaker, nationality, rating }) => ({ id, name, isMainSpeaker, nationality, rating: parseFloat(rating) }))
    }
}

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

    const { loading, data } = useQuery(MY_CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: data => data?.myConference && dispatch({ type: 'resetData', payload: data?.myConference }),
        onError: error => addToast(error, 'error', false)
    });

    const [updateConference, { loading: saving }] = useMutation(UPDATE_CONFERENCE,
        {
            onCompleted: result => {
                addToast(t('MyConferences.SavingSucceeded'), 'success')
                result?.saveConference && dispatch({ type: 'resetData', payload: result?.saveConference })

                if (isNew) {
                    history.push(`/myConferences/${result?.saveConference?.id}`);
                    return;
                }
            }
        })

    // eslint-disable-next-line 
    useEffect(() => () => setHeader(null), []);

    const handleSave = useCallback(() => {
        const input = generateModelForSaving(localConference);
        updateConference({ variables: { input: { ...input, organizerEmail } } })
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