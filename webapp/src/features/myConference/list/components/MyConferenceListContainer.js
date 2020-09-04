import React, { useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import MyConferenceList from './MyConferenceList';
import MyConferenceFilters from './MyConferenceFilters';
import { useFooter, useHeader } from 'providers/AreasProvider';
import Pagination from 'components/common/pagination/Pagination';
import conferences from '../../../../utils/mocks/organizerList';
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'

const MyConferenceListContainer = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const [, setFooter] = useFooter();
    const [, setHeader] = useHeader();

    const handleEdit = useCallback(id => () => history.push(`/myconferences/${id}`), [history]);
    const handleAdd = useCallback(() => history.push(`/myconferences/new`), [history]);

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

    return <>
        <MyConferenceFilters />
        <MyConferenceList
            conferences={conferences}
            onEdit={handleEdit}
        />
    </>
}

export default MyConferenceListContainer;