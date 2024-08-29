import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import ConferenceSubtitle from './ConferenceSubtitle'
import ConferenceContent from './ConferenceContent'
import { Card, useToast } from '@totalsoft/rocket-ui'
import ConferenceTitle from './ConferenceTitle'
import { useEmail } from 'hooks/useEmail'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { DELETE_CONFERENCE } from 'features/conference/gql/mutations'
import { useTranslation } from 'react-i18next'
import { useError } from 'hooks/errorHandling'

const ConferenceItem = props => {
  const { conference, onChangeAttendanceStatus } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [email] = useEmail()
  const showError = useError()
  const addToast = useToast()
  const { name, organizerEmail, speakers, location, id } = conference
  const speaker = speakers.find(speaker => speaker.isMainSpeaker)

  const [deleteConference] = useMutation(DELETE_CONFERENCE, {
    onCompleted: () => addToast(t('General.DeletingSucceeded'), 'success'),
    onError: showError
  })

  const handleEdit = useCallback(() => navigate(`/conferences/${id}`), [navigate, id])

  const handleDele = useCallback(() => {
    deleteConference({ variables: { id } })
  }, [deleteConference, id])

  const title =
    email.toUpperCase() === organizerEmail?.toUpperCase() ? (
      <ConferenceTitle title={name} onEdit={handleEdit} onDelete={handleDele} />
    ) : (
      name
    )

  return (
    <Card title={title} subheader={<ConferenceSubtitle speaker={speaker} location={location} />}>
      <ConferenceContent onChangeAttendanceStatus={onChangeAttendanceStatus} conference={conference} />
    </Card>
  )
}

ConferenceItem.propTypes = {
  conference: PropTypes.object.isRequired,
  onChangeAttendanceStatus: PropTypes.func.isRequired
}

export default ConferenceItem
