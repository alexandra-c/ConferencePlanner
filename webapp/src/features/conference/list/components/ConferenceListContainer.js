import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ConferenceList from './ConferenceList';
import ConferenceFilters from './ConferenceFilters';
import { useFooter } from 'providers/AreasProvider';
import Pagination from 'components/common/pagination/Pagination';
import { useQuery, useMutation } from '@apollo/client';
import { CONFERENCE_LIST_QUERY } from '../queries/ConferenceListQuery';
import { emptyObject } from 'utils/constants';
import { useToast } from 'hooks/toasts';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import { useEmail } from 'hooks/useEmail';
import { ATTEND_CONFERENCE_MUTATION } from '../mutations/AttendConference';
import { WITHDRAW_CONFERENCE_MUTATION } from '../mutations/WithdrawConference';

import DialogDisplay from 'components/common/dialogBox/DialogDisplay';
import ConferenceCodeModal from './ConferenceCodeModal';

const defaultPager = {
    totalCount: 0,
    pageSize: 5,
    page: 0,
    direction: 1,
    afterId: 0
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

    const { data, error, loading, refetch } = useQuery(CONFERENCE_LIST_QUERY, {
        variables: {
            pager: {
                pageSize: pager.pageSize,
                afterId: pager.afterId,
                sortBy: pager.sortBy,
                direction: pager.direction,
            },
            filters,
            userEmail
        }
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
        },
        onError: error => addToast(error, 'error', false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => setFooter(null), []);
    useEffect(() => {
        setFooter(
            <Pagination
                totalCount={10}
                pageSize={5}
                page={0}
                rowsPerPageOptions={[5, 10, 15, 20]}
                onChangeRowsPerPage={() => { }}
                onChangePage={() => { }}
                onRefresh={refetch}
            />
        )
    }, [setFooter, refetch])

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

    if (error) {
        addToast(t('Conference.ConferenceListError', error, 'error'))
    }

    if (loading) {
        return <LoadingFakeText lines={10} />
    }

    return (<>
        <ConferenceFilters filters={{}} onApplyFilters={() => { }} />
        <ConferenceList
            conferences={data?.conferenceList.values}
            onAttend={handleAttend}
            onWithdraw={handleWithdraw}
        />
        <DialogDisplay
            id="showQRCode"
            open={open}
            title={t("General.Congratulations")}
            content={<ConferenceCodeModal code={code} />}
            onClose={() => { setOpenDialog(false); setCode("") }}
        />
    </>)
}

export default ConferenceListContainer;