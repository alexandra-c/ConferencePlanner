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
import { useQuery } from '@apollo/client';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import { CONFERENCE_LIST_QUERY } from 'features/conference/list/queries/ConferenceListQuery';

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

    const handleEdit = useCallback(id => () => history.push(`/myConferences/${id}`), [history]);
    const handleAdd = useCallback(() => history.push(`/myConferences/new`), [history]);

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

    useLayoutEffect(() => {
        if (data && pager.totalCount !== data?.conferenceList?.pagination?.totalCount) {
            setPager(currentPager => ({ ...currentPager, totalCount: data?.conferenceList?.pagination?.totalCount }));
        }
    }, [data, pager.totalCount, setPager]);


    const handleChangePage = useCallback((page) =>
        setPager(currentPager => ({ ...currentPager, page }))
        , [setPager]);

    const handleChangeRowsPerPage = useCallback((pageSize) =>
        setPager({ ...defaultPager, pageSize: parseInt(pageSize, 10) })
        , [setPager]);

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
        />
    </>
}

export default MyConferenceListContainer;