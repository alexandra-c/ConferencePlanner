import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import MyConferenceItem from "./MyConferenceItem";

const MyConferenceList = ({ conferences, onEdit, onDelete }) => {

    return <Grid container spacing={2}>
        {conferences?.map(conference =>
            <Grid item xs={12} lg={4} key={conference.id}>
                <MyConferenceItem
                    conference={conference}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </Grid>
        )}
    </Grid >
}

MyConferenceList.propTypes = {
    conferences: PropTypes.array,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default MyConferenceList;