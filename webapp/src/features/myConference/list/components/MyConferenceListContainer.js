import React, { useEffect, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MyConferenceList from './MyConferenceList'
import MyConferenceFilters from './MyConferenceFilters'
import { useFooter, useHeader } from 'providers/AreasProvider'
import { useToast, Pagination, LoadingFakeText } from '@bit/totalsoft_oss.react-mui.kit.core'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import { emptyObject } from 'utils/constants'
import { useEmail } from 'hooks/useEmail'
import { useQuery, useMutation } from '@apollo/client'
import { CONFERENCE_LIST_QUERY } from 'features/conference/list/queries/ConferenceListQuery'
import { DELETE_CONFERENCE_MUTATION } from '../mutations/DeleteConference'
import { useError } from 'hooks/errorHandling'

const defaultPager = {
  totalCount: 0,
  pageSize: 3,
  page: 0
}

const MyConferenceListContainer = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const [, setFooter] = useFooter()
  const [, setHeader] = useHeader()
  const showError = useError()
  const addToast = useToast()
  const [pager, setPager] = useState(defaultPager)
  const [userEmail] = useEmail()
  const [filters, setFilters] = useState(emptyObject)

  const { data, error, loading, refetch } = useQuery(CONFERENCE_LIST_QUERY, {
    variables: {
      pager: {
        page: pager.page,
        pageSize: pager.pageSize
      },
      filters: {
        ...filters,
        organizerEmail: userEmail
      },
      userEmail
    }
  })

  const [deleteConference] = useMutation(DELETE_CONFERENCE_MUTATION, {
    onCompleted: data => {
      if (!data) {
        return
      }
      addToast(t('Conferences.SuccessfullyDeleted'), 'success')
      refetch()
    },
    onError: showError
  })

  const handleEdit = useCallback(id => () => history.push(`/myConferences/${id}`), [history])
  const handleAdd = useCallback(() => history.push(`/myConferences/new`), [history])
  const handleDelete = useCallback(
    id => {
      deleteConference({ variables: { id } })
    },
    [deleteConference]
  )

  const handleChangePage = useCallback(page => setPager(currentPager => ({ ...currentPager, page })), [setPager])

  const handleChangeRowsPerPage = useCallback(pageSize => setPager({ ...defaultPager, pageSize: parseInt(pageSize, 10) }), [setPager])

  useEffect(() => {
    if (data && pager.totalCount !== data?.conferenceList?.pagination?.totalCount) {
      setPager(currentPager => ({ ...currentPager, totalCount: data?.conferenceList?.pagination?.totalCount }))
    }
  }, [data, pager.totalCount, setPager])

  useEffect(
    () => () => {
      setFooter(null)
      setHeader(null)
    },
    [setFooter, setHeader]
  )

  useEffect(() => {
    setHeader(<MyConferenceHeader headerText={t('NavBar.MyConferences')} onAdd={handleAdd} />)
  }, [handleAdd, setHeader, t])

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
  }, [handleChangePage, handleChangeRowsPerPage, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter])

  const handleApplyFilters = useCallback(
    value => {
      setPager(currentPager => ({ ...currentPager, page: 0 })) // reset pager
      setFilters(value)
    },
    [setFilters, setPager]
  )

  if (error) {
    addToast(error, 'error', false)
  }

  if (loading) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <MyConferenceList conferences={data?.conferenceList?.values} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  )
}

export default MyConferenceListContainer
