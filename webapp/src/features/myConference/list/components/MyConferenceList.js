import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import MyConferenceListItem from "./MyConferenceListItem";

const MyConferenceList = ({ conferences, onEdit }) => {

    return <Grid container spacing={2}>
        {conferences.map(conference =>
            <Grid item xs={12} lg={4} key={conference.id}>
                <MyConferenceListItem
                    conference={conference}
                    onEdit={onEdit}
                />
            </Grid>
        )}
    </Grid >
}

MyConferenceList.propTypes = {
    conferences: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default MyConferenceList;