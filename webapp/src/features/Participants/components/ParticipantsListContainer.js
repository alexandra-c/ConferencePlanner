import React from 'react';
import ParticipantsList from './ParticipantsList';
import ParticipantFilters from './ParticipantFilters';

const ParticipantsListContainer = ({ }) => {

    return (<>
        <ParticipantFilters />
        <ParticipantsList />
    </>)
}

export default ParticipantsListContainer;