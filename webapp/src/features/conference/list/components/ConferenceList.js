import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import ConferenceItem from './ConferenceItem'

const ConferenceList = ({ conferences, onAttend, onWithdraw }) => {
  return (
    <Grid container spacing={2}>
      {conferences?.map(conference => (
        <Grid item xs={12} lg={4} key={conference.id}>
          <ConferenceItem conference={conference} onAttend={onAttend} onWithdraw={onWithdraw} />
        </Grid>
      ))}
    </Grid>
  )
}

ConferenceList.propTypes = {
  conferences: PropTypes.array,
  onAttend: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired
}

export default ConferenceList
