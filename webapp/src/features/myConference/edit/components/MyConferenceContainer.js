import React from 'react';
// import PropTypes from 'prop-types';
import MyConference from './MyConference';
// import { conference, types, categories, cities, countries, counties } from 'utils/mocks/organizers'
import { useRouteMatch } from 'react-router-dom';
import { MY_CONFERENCE_QUERY } from '../queries/MyConferenceQuery';
import { useQuery } from '@apollo/client';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import { useToast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const MyConferenceContainer = () => {
    const match = useRouteMatch();
    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';

    const { t } = useTranslation();
    const addToast = useToast();
    const { loading, data, error } = useQuery(MY_CONFERENCE_QUERY, {
        variables: { id: conferenceId },
    });

    if(loading) {
        return <LoadingFakeText lines={10} />;
    }

    if (error) {
        addToast(t('MyConference.QueryError', error, 'error'))  // eritat QueryError
    }

    return (
        <MyConference
            conference={isNew ? {} : data.myConference}
            types={data.typeList}
            categories={data.categoryList}
            countries={data.countryList}
            counties={data.countyList}
            cities={data.cityList}
        />
    );
}

MyConferenceContainer.propTypes = {
}

export default MyConferenceContainer;