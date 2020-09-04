import React from 'react';
import IconCard from 'components/common/cards/IconCard';
import ConferenceInfo from './ConferenceInfo';
// import ConferenceLocation from './ConferenceLocation';
import ConferenceSpeakers from './ConferenceSpeakers';
import { Info, Face } from '@material-ui/icons';

const Conference = ({ conferences, types, categories, speakers, locations, countries, counties, cities }) => {
    return <>
        <IconCard
            icon={Info}
            content={
                <ConferenceInfo
                    conferences={conferences}
                    locations={locations}
                    types={types}
                    categories={categories}
                    countries={countries}
                    counties={counties}
                    cities={cities}
                />
            }
        />
        {/* <IconCard
            icon={LocationOn}
            content={
                <ConferenceLocation
                    countries={countries}
                    counties={counties}
                    cities={cities}
                />
            }
        /> */}
        <IconCard
            icon={Face}
            content={
                <ConferenceSpeakers
                    speakers={speakers}
                />
            }
        />
    </>
}

export default Conference;