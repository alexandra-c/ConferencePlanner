import React from 'react';
import PropTypes from 'prop-types';
import { RegularCard } from '@bit/totalsoft_oss.react-mui.kit.core';
import { find } from 'ramda';
import MyConferenceSubtitle from './MyConferenceSubtitle';
import MyConferenceContent from './MyConferenceContent';

const MyConferenceItem = ({ conference, onEdit, onDelete }) => {
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
                onDelete={onDelete}
                conference={conference}
            />}
    />
}

MyConferenceItem.propTypes = {
    conference: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default MyConferenceItem;