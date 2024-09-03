import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import ConferenceHeader from 'features/conference/ConferenceHeader'
import Conference from './Conference'
import { FakeText, IconButton, useToast } from '@totalsoft/rocket-ui'
import { initialConference, reducer } from '../conferenceState'
import { conference as serverConference } from 'utils/mocks/conference'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { CONFERENCE_QUERY } from 'features/conference/gql/queries'
import { useError } from 'hooks/errorHandling'
import { UPDATE_CONFERENCE } from 'features/conference/gql/mutations'
import { useEmail } from 'hooks/useEmail'

const ConferenceContainer = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const isNew = id === 'new'
  const [email] = useEmail()
  const [, setHeader] = useHeader()
  const [conference, dispatch] = useReducer(reducer, initialConference)
  const navigate = useNavigate()
  const showError = useError()
  const addToast = useToast()

  const [updateConference] = useMutation(UPDATE_CONFERENCE, {
    onCompleted: result => {
      addToast(t('General.SavingSucceeded'), 'success')

      if (isNew) {
        navigate(`/conferences/${result?.saveConference?.id}`)
        return
      }

      result?.saveConference && dispatch({ type: 'resetData', payload: result?.saveConference })
    },
    onError: showError
  })

  const handleSave = useCallback(() => {
    const { id, name, startDate, endDate, deletedSpeakers, type, category, location, speakers } = conference
    const { city, county, country, ...locationData } = location
    const input = {
      id,
      name,
      startDate,
      endDate,
      deletedSpeakers,
      type,
      category,
      location: {
        ...locationData,
        cityId: city.id,
        countyId: county.id,
        countryId: country.id
      },
      speakers,
      organizerEmail: email
    }
    updateConference({ variables: { input } })
  }, [conference, email, updateConference])

  useEffect(() => () => setHeader(null), [setHeader])
  useEffect(() => {
    setHeader(
      <ConferenceHeader
        title={conference?.name}
        actions={<IconButton type='save' title={t('General.Buttons.Save')} onClick={handleSave} />}
      />
    )
  }, [conference?.name, handleSave, setHeader, t])

  useEffect(() => {
    if (!isNew) {
      dispatch({ type: 'resetData', payload: serverConference })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const { loading, data } = useQuery(CONFERENCE_QUERY, {
    variables: { id: parseInt(id) || -1, isNew },
    onCompleted: data => data?.conference && dispatch({ type: 'resetData', payload: data?.conference }),
    onError: showError
  })

  if (loading) {
    return <FakeText lines={10} />
  }

  return (
    <Conference
      conference={conference}
      dispatch={dispatch}
      types={data?.typeList}
      categories={data?.categoryList}
      countries={data?.countryList}
      counties={data?.countyList}
      cities={data?.cityList}
    />
  )
}

export default ConferenceContainer
