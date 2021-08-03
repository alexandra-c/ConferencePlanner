import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ConferenceList from './ConferenceList';
import ConferenceFilters from './ConferenceFilters';
import { useFooter } from 'providers/AreasProvider';
import { Pagination, LoadingFakeText, DialogDisplay } from '@bit/totalsoft_oss.react-mui.kit.core';
import { useQuery, useMutation } from '@apollo/client';
import { CONFERENCE_LIST_QUERY } from '../queries/ConferenceListQuery';
import { emptyObject } from 'utils/constants';
import { useToast } from 'hooks/toasts';
import { useEmail } from 'hooks/useEmail';
import { ATTEND_CONFERENCE_MUTATION } from '../mutations/AttendConference';
import { WITHDRAW_CONFERENCE_MUTATION } from '../mutations/WithdrawConference';

import ConferenceCodeModal from './ConferenceCodeModal';

const defaultPager = {
    totalCount: 0,
    pageSize: 3,
    page: 0
}

const ConferenceListContainer = () => {
    const { t } = useTranslation();
    const addToast = useToast();
    const [, setFooter] = useFooter();
    const [pager, setPager] = useState(defaultPager);
    const [filters, setFilters] = useState(emptyObject)
    const [userEmail] = useEmail();
    const [code, setCode] = useState("")
    const [open, setOpenDialog] = useState(false)

    const { data, loading, refetch } = useQuery(CONFERENCE_LIST_QUERY, {
        variables: {
            pager: {
                page: pager.page,
                pageSize: pager.pageSize
            },
            filters,
            userEmail
        },
        onError: error => addToast(error, 'error', false)
    });

    const [attend] = useMutation(ATTEND_CONFERENCE_MUTATION, {
        onCompleted: (data) => {
            if (!data) {
                return
            }
            setCode(data.attend)
            setOpenDialog(true)
            addToast(t("Conferences.SuccessfullyAttended"), 'success')
        },
        onError: error => addToast(error, 'error', false)
    })

    const [withdraw] = useMutation(WITHDRAW_CONFERENCE_MUTATION, {
        onCompleted: () => {
            addToast(t("Conferences.SuccessfullyWithdrawn"), 'success')
            refetch()
        },
        onError: error => addToast(error, 'error', false)
    })

    const handleChangePage = useCallback((page) =>
        setPager(currentPager => ({ ...currentPager, page }))
        , [setPager]);

    const handleChangeRowsPerPage = useCallback((pageSize) =>
        setPager({ ...defaultPager, pageSize: parseInt(pageSize, 10) })
        , [setPager]);

    useEffect(() => {
        if (data && pager.totalCount !== data?.conferenceList?.pagination?.totalCount) {
            setPager(currentPager => ({ ...currentPager, totalCount: data?.conferenceList?.pagination?.totalCount }));
        }
    }, [data, pager.totalCount, setPager]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => setFooter(null), []);
    useEffect(() => {
        setFooter(
            <Pagination
                totalCount={pager.totalCount}
                pageSize={pager.pageSize}
                page={pager.page}
                rowsPerPageOptions={[3, 6, 9, 12, 21]}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangePage={handleChangePage}
                onRefresh={refetch}
            />
        )
    }, [setFooter, refetch, handleChangeRowsPerPage, handleChangePage, pager.totalCount, pager.pageSize, pager.page])

    const handleAttend = useCallback((conference) => () => {
        const input = {
            attendeeEmail: userEmail,
            conferenceId: conference.id
        }
        attend({ variables: { input } })
    }, [attend, userEmail]);

    const handleWithdraw = useCallback((conference) => () => {
        const input = {
            attendeeEmail: userEmail,
            conferenceId: conference.id
        }
        withdraw({ variables: { input } })
    }, [withdraw, userEmail]);

    const handleApplyFilters = useCallback((value) => {
        setPager(currentPager => ({ ...currentPager, page: 0 })); // reset pager
        setFilters(value);
    }, [setFilters, setPager]);

    if (loading) {
        return <LoadingFakeText lines={10} />
    }

    return <>
        <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
        <ConferenceList
            conferences={data?.conferenceList?.values}
            onAttend={handleAttend}
            onWithdraw={handleWithdraw}
        />
        <DialogDisplay
            id="showQRCode"
            open={open}
            title={t("General.Congratulations")}
            content={<ConferenceCodeModal code={code} />}
            onClose={() => { setOpenDialog(false); setCode(""); refetch() }}
        />
    </>
}

export default ConferenceListContainer;
