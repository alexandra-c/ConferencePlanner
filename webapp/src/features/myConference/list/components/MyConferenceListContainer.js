import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import MyConferenceList from './MyConferenceList';
import MyConferenceFilters from './MyConferenceFilters';
import { useFooter, useHeader } from 'providers/AreasProvider';
import Pagination from 'components/common/pagination/Pagination';
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import { useToast } from 'hooks/toasts';
import { emptyObject } from 'utils/constants';
import { useEmail } from 'hooks/useEmail';
import { useQuery, useMutation } from '@apollo/client';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import { CONFERENCE_LIST_QUERY } from 'features/conference/list/queries/ConferenceListQuery';
import { DELETE_CONFERENCE_MUTATION } from '../mutations/DeleteConference';

const defaultPager = {
    totalCount: 0,
    pageSize: 5,
    page: 0
}

const MyConferenceListContainer = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const [, setFooter] = useFooter();
    const [, setHeader] = useHeader();
    const addToast = useToast();
    const [pager, setPager] = useState(defaultPager);
    const [userEmail] = useEmail();
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
    });

    const [deleteConference] = useMutation(DELETE_CONFERENCE_MUTATION, {
        onCompleted: (data) => {
            if (!data) {
                return
            }
            addToast(t("Conferences.SuccessfullyDeleted"), 'success')
            refetch()
        },
        onError: error => addToast(error, 'error', false)
    })

    const handleEdit = useCallback(id => () => history.push(`/myConferences/${id}`), [history]);
    const handleAdd = useCallback(() => history.push(`/myConferences/new`), [history]);
    const handleDelete = useCallback((id) => {
        deleteConference({ variables: { id } })
    }, [deleteConference]);

    const handleChangePage = useCallback((page) =>
        setPager(currentPager => ({ ...currentPager, page }))
        , [setPager]);

    const handleChangeRowsPerPage = useCallback((pageSize) =>
        setPager({ ...defaultPager, pageSize: parseInt(pageSize, 10) })
        , [setPager]);

    useLayoutEffect(() => {
        if (data && pager.totalCount !== data?.conferenceList?.pagination?.totalCount) {
            setPager(currentPager => ({ ...currentPager, totalCount: data?.conferenceList?.pagination?.totalCount }));
        }
    }, [data, pager.totalCount, setPager]);

    // eslint-disable-next-line 
    useEffect(() => () => (setFooter(null), setHeader(null)), []);

    useEffect(() => {
        setHeader(
            <MyConferenceHeader
                headerText={t('NavBar.MyConferences')}
                onAdd={handleAdd}
            />
        )
    }, [handleAdd, setHeader, t])

    useEffect(() => {
        setFooter(
            <Pagination
                totalCount={pager.totalCount}
                pageSize={pager.pageSize}
                page={pager.page}
                rowsPerPageOptions={[5, 10, 15, 20]}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangePage={handleChangePage}
                onRefresh={refetch}
            />
        )
    }, [handleChangePage, handleChangeRowsPerPage, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter])

    const handleApplyFilters = useCallback((value) => {
        setPager(currentPager => ({ ...currentPager, page: 0 })); // reset pager
        setFilters(value);
    }, [setFilters, setPager]);

    if (error) {
        addToast(error, 'error', false)
    }

    if (loading) {
        return <LoadingFakeText lines={10} />
    }

    return <>
        <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
        <MyConferenceList
            conferences={data?.conferenceList?.values}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    </>
}

export default MyConferenceListContainer;