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
        const { id, name, startDate, endDate, deletedSpeakers, type, category, location, speakers } = localConference;
        const { city, county, country, ...locationData } = location
        const input = {
            id, name, startDate, endDate, deletedSpeakers,
            type: {
                ...type,
                code: type.code ? type.code : type.name.slice(0, 2)
            },
            category: {
                ...category,
                code: category.code ? category.code : type.name.slice(0, 2)
            },
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