import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import ConferenceListItem from "./ConferenceListItem";

const ConferenceList = ({ conferences }) => {

    return (<>
        <Grid container spacing={2}>
            {conferences.map(conference =>
                <Grid item xs={12} lg={4} key={conference.id}>
                    <ConferenceListItem
                        conference={conference}
                    />
                </Grid>
            )}
        </Grid >
    </>)
}

ConferenceList.propTypes = {
    conferences: PropTypes.array.isRequired
}

export default ConferenceList;