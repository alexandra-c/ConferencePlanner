import React from 'react';
// import PropTypes from 'prop-types';
import Conference from './Conference';
import { conference, types, categories, cities, countries, counties } from 'utils/mocks/organizers'
import { useRouteMatch } from 'react-router-dom';

const ConferenceContainer = () => {
    const match = useRouteMatch();
    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';

    return (
        <Conference
            conference={isNew ? {} : conference}
            types={types}
            categories={categories}
            countries={countries}
            counties={counties}
            cities={cities}
        />
    );
}

ConferenceContainer.propTypes = {
}

export default ConferenceContainer;