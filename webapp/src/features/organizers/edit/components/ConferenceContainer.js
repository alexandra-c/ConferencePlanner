import React from 'react';
import Conference from './Conference';
import { conference, types, categories, cities, countries, counties } from 'utils/mocks/organisers'

const ConferenceContainer = () => {
    return (
        <Conference
            conference={conference}
            types={types}
            categories={categories}
            countries={countries}
            counties={counties}
            cities={cities}
        />
    );
}

export default ConferenceContainer;