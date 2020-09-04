import React from 'react';
import Conference from './Conference';
import { conferences, types, categories, locations, cities, countries, counties, speakers } from 'utils/mocks/organisers'

function ConferenceContainer() {
    return (
        <Conference
            conferences={conferences}
            locations={locations}
            types={types}
            categories={categories}
            countries={countries}
            counties={counties}
            cities={cities}
            speakers={speakers}
        />

    );
}

export default ConferenceContainer;