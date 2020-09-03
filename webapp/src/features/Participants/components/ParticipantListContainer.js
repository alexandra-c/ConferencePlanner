import React from 'react';
import ParticipantList from './ParticipantList';
import ParticipantFilters from './ParticipantFilters';

const ParticipantListContainer = () => {

    return (<>
        <ParticipantFilters />
        <ParticipantList />
    </>)
}

export default ParticipantListContainer;