import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import MyConferenceListItem from "./MyConferenceListItem";

const MyConferenceList = ({ conferences }) => {

    return (<>
        <Grid container spacing={2}>
            {conferences.map(conference =>
                <Grid item xs={12} lg={4} key={conference.id}>
                    <MyConferenceListItem
                        conference={conference}
                    />
                </Grid>
            )}
        </Grid >
    </>)
}

MyConferenceList.propTypes = {
    conferences: PropTypes.array.isRequired
}

export default MyConferenceList;