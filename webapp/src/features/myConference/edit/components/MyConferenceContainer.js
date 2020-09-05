import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import MyConference from './MyConference';
import * as data from 'utils/mocks/organizers'
import { useRouteMatch } from 'react-router-dom';
import { MY_CONFERENCE_QUERY } from '../queries/MyConferenceQuery';
import { useQuery } from '@apollo/client';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import { useTranslation } from 'react-i18next';
import { set } from 'lodash';

const MyConferenceContainer = () => {
    const match = useRouteMatch();
    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';

    const { t } = useTranslation();
    // const { loading, data, error } = useQuery(MY_CONFERENCE_QUERY, {
    //     variables: { id: conferenceId },
    // });

    const [localConference, setLocalConference] = useState(data.conference)

    const handlePropertyChange = propName => value => setLocalConference(prev => set({ ...prev }, propName, value))

    const handleRemoveSpeaker = (speakerId) => setLocalConference(prev => ({ ...prev, speakers: prev.speakers.filter(s => s.id !== speakerId) }))

    // if (loading) {
    //     return <LoadingFakeText lines={10} />;
    // }

    return (
        <MyConference
            conference={isNew ? {} : localConference}
            onPropertyChange={handlePropertyChange}
            onRemoveSpeaker={handleRemoveSpeaker}
            types={data.types}
            categories={data.categories}
            countries={data.countries}
            counties={data.counties}
            cities={data.cities}
        />
    );
}

MyConferenceContainer.propTypes = {
}

export default MyConferenceContainer;