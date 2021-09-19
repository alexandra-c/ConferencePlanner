import React from 'react'
import PropTypes from 'prop-types'
import { RegularCard } from '@bit/totalsoft_oss.react-mui.kit.core'
import { find } from 'ramda'
import ConferenceSubtitle from './ConferenceSubtitle'
import ConferenceContent from './ConferenceContent'

const ConferenceItem = ({ conference, onAttend, onWithdraw }) => {
  const { name, speakers, location } = conference
  const speaker = find(speaker => speaker.isMainSpeaker, speakers)

  return (
    <RegularCard
      cardTitle={name}
      cardSubtitle={<ConferenceSubtitle speaker={speaker} location={location} />}
      content={<ConferenceContent onAttend={onAttend} conference={conference} onWithdraw={onWithdraw} />}
    />
  )
}

ConferenceItem.propTypes = {
  conference: PropTypes.object.isRequired,
  onAttend: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired
}

export default ConferenceItem
