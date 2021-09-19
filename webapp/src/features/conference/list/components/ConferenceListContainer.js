import React, { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ConferenceList from './ConferenceList'
import ConferenceFilters from './ConferenceFilters'
import { useFooter } from 'providers/AreasProvider'
import { useToast, Pagination, LoadingFakeText, DialogDisplay } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useQuery, useMutation } from '@apollo/client'
import { CONFERENCE_LIST_QUERY } from '../queries/ConferenceListQuery'
import { emptyObject, emptyArray } from 'utils/constants'
import { useEmail } from 'hooks/useEmail'
import { ATTEND_CONFERENCE_MUTATION } from '../mutations/AttendConference'
import { WITHDRAW_CONFERENCE_MUTATION } from '../mutations/WithdrawConference'

import ConferenceCodeModal from './ConferenceCodeModal'
import { useError } from 'hooks/errorHandling'

const defaultPager = {
  totalCount: 0,
  pageSize: 3,
  page: 0
}

const ConferenceListContainer = () => {
  const { t } = useTranslation()
  const showError = useError()
  const addToast = useToast()
  const [, setFooter] = useFooter()
  const [pager, setPager] = useState(defaultPager)
  const [filters, setFilters] = useState(emptyObject)
  const [userEmail] = useEmail()
  const [code, setCode] = useState('')
  const [open, setOpenDialog] = useState(false)
  const [suggestedConferences, setSuggestedConferences] = useState(emptyArray)

  const { data, loading, refetch } = useQuery(CONFERENCE_LIST_QUERY, {
    variables: {
      pager: {
        page: pager.page,
        pageSize: pager.pageSize
      },
      filters,
      userEmail
    },
    onError: showError
  })

  const [attend] = useMutation(ATTEND_CONFERENCE_MUTATION, {
    onCompleted: data => {
      if (!data) {
        return
      }
      setCode(data?.attend?.code)
      setSuggestedConferences(data?.attend?.suggestedConferences)
      setOpenDialog(true)
      addToast(t('Conferences.SuccessfullyAttended'), 'success')
    },
    onError: showError
  })

  const [withdraw] = useMutation(WITHDRAW_CONFERENCE_MUTATION, {
    onCompleted: () => {
      addToast(t('Conferences.SuccessfullyWithdrawn'), 'success')
      refetch()
    },
    onError: showError
  })

  const handleChangePage = useCallback(page => setPager(currentPager => ({ ...currentPager, page })), [setPager])

  const handleChangeRowsPerPage = useCallback(pageSize => setPager({ ...defaultPager, pageSize: parseInt(pageSize, 10) }), [setPager])

  useEffect(() => {
    if (data && pager.totalCount !== data?.conferenceList?.pagination?.totalCount) {
      setPager(currentPager => ({ ...currentPager, totalCount: data?.conferenceList?.pagination?.totalCount }))
    }
  }, [data, pager.totalCount, setPager])

  useEffect(() => () => setFooter(null), [setFooter])
  useEffect(() => {
    setFooter(
      <Pagination
        totalCount={pager.totalCount}
        pageSize={pager.pageSize}
        page={pager.page}
        rowsPerPageOptions={[3, 6, 9, 12, 21]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        onRefresh={refetch}
      />
    )
  }, [setFooter, refetch, handleChangeRowsPerPage, handleChangePage, pager.totalCount, pager.pageSize, pager.page])

  const handleAttend = useCallback(
    conference => () => {
      const input = {
        attendeeEmail: userEmail,
        conferenceId: conference.id
      }
      attend({ variables: { input } })
    },
    [attend, userEmail]
  )

  const handleWithdraw = useCallback(
    conference => () => {
      const input = {
        attendeeEmail: userEmail,
        conferenceId: conference.id
      }
      withdraw({ variables: { input } })
    },
    [withdraw, userEmail]
  )

  const handleApplyFilters = useCallback(
    value => {
      setPager(currentPager => ({ ...currentPager, page: 0 })) // reset pager
      setFilters(value)
    },
    [setFilters, setPager]
  )

  const handleClose = useCallback(() => {
    setOpenDialog(false)
    setCode('')
    refetch()
  }, [refetch])

  if (loading) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <ConferenceList conferences={data?.conferenceList?.values} onAttend={handleAttend} onWithdraw={handleWithdraw} />
      <DialogDisplay
        id='showQRCode'
        open={open}
        title={t('General.Congratulations')}
        content={
          <ConferenceCodeModal
            code={code}
            suggestedConferences={suggestedConferences}
            onAttend={handleAttend}
            onWithdraw={handleWithdraw}
          />
        }
        onClose={handleClose}
      />
    </>
  )
}

export default ConferenceListContainer
