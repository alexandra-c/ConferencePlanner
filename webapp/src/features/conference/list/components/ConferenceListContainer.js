import React, { useEffect, useCallback, useState } from 'react';
import { useFooter } from 'providers/AreasProvider';
import { useToast } from 'hooks/toasts'
import { useTranslation } from 'react-i18next';
import Pagination from 'components/common/pagination/Pagination';
import { useMutation } from '@apollo/client';
import { useEmail } from 'hooks/useEmail';
import { ATTEND_CONFERENCE_MUTATION } from '../mutations/AttendConference';
import { WITHDRAW_CONFERENCE_MUTATION } from '../mutations/WithdrawConference';

import DialogDisplay from 'components/common/dialogBox/DialogDisplay';
import ConferenceList from './ConferenceList';
import ConferenceFilters from './ConferenceFilters';

import conferences from 'utils/mocks/conferences';
import ConferenceCodeModal from './ConferenceCodeModal';

const ConferenceListContainer = () => {
    const [userEmail] = useEmail();
    const [, setFooter] = useFooter();
    const addToast = useToast()
    const { t } = useTranslation();
    const [code, setCode] = useState("")
    const [open, setOpenDialog] = useState(false)

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
                onRefresh={() => { }}
            />
        )
    }, [setFooter])

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

    return (<>
        <ConferenceFilters filters={{}} onApplyFilters={() => { }} />
        <ConferenceList
            conferences={conferences}
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