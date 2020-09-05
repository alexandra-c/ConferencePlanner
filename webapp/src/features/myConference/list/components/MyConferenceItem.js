import React from 'react';
import PropTypes from 'prop-types';
import RegularCard from 'components/common/cards/RegularCard';
import { find } from 'ramda';
import MyConferenceSubtitle from './MyConferenceSubtitle';
import MyConferenceContent from './MyConferenceContent';

const MyConferenceItem = ({ conference, onEdit }) => {
    const { name, speakers, location } = conference;
    const speaker = find(speaker => speaker.isMainSpeaker, speakers)

    return <RegularCard
        cardTitle={name}
        cardSubtitle={
            <MyConferenceSubtitle
                speaker={speaker}
                location={location}
            />}
        content={
            <MyConferenceContent
                onEdit={onEdit}
                conference={conference}
            />}
    />
}

MyConferenceItem.propTypes = {
    conference: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default MyConferenceItem;