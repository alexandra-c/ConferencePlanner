import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from './ConferenceFilters'
import { FakeText, IconButton } from '@totalsoft/rocket-ui'
import ConferenceList from './ConferenceList'
import { generateDefaultFilters } from 'utils/functions'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import ConferenceHeader from 'features/conference/ConferenceHeader'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries'
import { useEmail } from 'hooks/useEmail'
import { useError } from 'hooks/errorHandling'
import { CHANGE_ATTENDANCE_STATUS_MUTATION, DELETE_CONFERENCE } from 'features/conference/gql/mutations'

const ConferenceListContainer = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email] = useEmail()
  const showError = useError()

  const [filters, setFilters] = useState(generateDefaultFilters())

  const { data, loading } = useQuery(CONFERENCE_LIST_QUERY, { variables: { filters, userEmail: email }, onError: showError })

  const [deleteConference] = useMutation(DELETE_CONFERENCE, {
    refetchQueries: [{ query: CONFERENCE_LIST_QUERY, variables: { filters, userEmail: email } }],
    onError: showError
  })

  const handleDelete = useCallback(
    id => () => {
      deleteConference({ variables: { id } })
    },
    [deleteConference]
  )

  const handleAddClick = useCallback(() => {
    navigate('/conferences/new')
  }, [navigate])

  const [, setHeader] = useHeader()
  useEffect(() => () => setHeader(null), [setHeader])
  useEffect(() => {
    setHeader(
      <ConferenceHeader
        title={t('NavBar.Conferences')}
        actions={<IconButton type='add' key='addButton' title={t('General.Buttons.AddConference')} onClick={handleAddClick} />}
      />
    )
  }, [handleAddClick, setHeader, t])

  const handleApplyFilters = useCallback(filters => {
    setFilters(filters)
  }, [])

  const [changeAttendanceStatus] = useMutation(CHANGE_ATTENDANCE_STATUS_MUTATION, {
    refetchQueries: [{ query: CONFERENCE_LIST_QUERY, variables: { filters, userEmail: email } }],
    onError: showError
  })

  const handleChangeAttendanceStatus = useCallback(
    (conferenceId, statusId) => () => {
      const input = {
        attendeeEmail: email,
        conferenceId,
        statusId
      }
      changeAttendanceStatus({ variables: { input } })
    },
    [changeAttendanceStatus, email]
  )

  if (loading) {
    return <FakeText lines={10} />
  }

  return (
    <>
      <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <ConferenceList onDelete={handleDelete} onChangeAttendanceStatus={handleChangeAttendanceStatus} conferences={data?.conferenceList} />
    </>
  )
}

export default ConferenceListContainer
