import React from 'react'
import PropTypes from 'prop-types'
import ConferenceItem from './ConferenceItem'
import { Grid } from '@mui/material'

const ConferenceList = props => {
  const { conferences, onDelete, onChangeAttendanceStatus } = props

  return (
    <Grid container spacing={2}>
      {conferences?.map(conference => (
        <Grid item xs={12} lg={4} key={conference.id}>
          <ConferenceItem onDelete={onDelete} onChangeAttendanceStatus={onChangeAttendanceStatus} conference={conference} />
        </Grid>
      ))}
    </Grid>
  )
}

ConferenceList.propTypes = {
  conferences: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onChangeAttendanceStatus: PropTypes.func.isRequired
}

export default ConferenceList
