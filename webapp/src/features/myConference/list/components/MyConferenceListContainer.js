import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MyConferenceList from './MyConferenceList';
import MyConferenceFilters from './MyConferenceFilters';
import { useFooter, useHeader } from 'providers/AreasProvider';
import Pagination from 'components/common/pagination/Pagination';
import conferences from '../mockFile';
import StandardHeader from 'features/common/StandardHeader'

const MyConferenceListContainer = () => {
    const { t } = useTranslation();
    const [, setFooter] = useFooter();
    const [, setHeader] = useHeader();

    // eslint-disable-next-line 
    useEffect(() => () => (setFooter(null), setHeader(null)), []);

    useEffect(() => {
        setHeader(
            <StandardHeader
                headerText={t('NavBar.MyConferences')}
            />
        )
    }, [setHeader, t])

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

    return (<>
        <MyConferenceFilters />
        <MyConferenceList
            conferences={conferences}
        />
    </>)
}

export default MyConferenceListContainer;