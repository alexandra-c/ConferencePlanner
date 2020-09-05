import React from 'react';
import PropTypes from 'prop-types';
import RegularCard from 'components/common/cards/RegularCard';
import { find } from 'ramda';
import ConferenceSubtitle from './ConferenceSubtitle';
import ConferenceContent from './ConferenceContent';

const ConferenceItem = ({ conference }) => {
    const { name, speakers, location, status, startDate, endDate, type, category } = conference;
    const speaker = find(speaker => speaker.isMainSpeaker, speakers)

    return (
        <RegularCard
            cardTitle={name}
            cardSubtitle={
                <ConferenceSubtitle
                    speaker={speaker}
                    location={location}
                />}
            content={
                <ConferenceContent
                    status={status}
                    startDate={startDate}
                    endDate={endDate}
                    type={type}
                    category={category}
                />}
        />
    )
}

ConferenceItem.propTypes = {
    conference: PropTypes.object.isRequired
}

export default ConferenceItem;