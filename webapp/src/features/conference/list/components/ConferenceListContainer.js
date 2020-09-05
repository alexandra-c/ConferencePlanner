import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConferenceList from './ConferenceList';
import ConferenceFilters from './ConferenceFilters';
import { useFooter } from 'providers/AreasProvider';
import Pagination from 'components/common/pagination/Pagination';
import { useQuery } from '@apollo/client';
import { CONFERENCE_LIST_QUERY } from '../queries/ConferenceListQuery';
import { emptyObject } from 'utils/constants';
import { useToast } from 'hooks/toasts';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';

const defaultPager = {
    totalCount: 0,
    pageSize: 5,
    page: 0,
    direction: 1,
    afterId: 0
}

const ConferenceListContainer = () => {
    const { t } = useTranslation();
    const [, setFooter] = useFooter();
    const [pager, setPager] = useState(defaultPager);
    const [filters, setFilters] = useState(emptyObject)
    const addToast = useToast();

    const { data, error, loading, refetch } = useQuery(CONFERENCE_LIST_QUERY, {
        variables: {
            pager: {
                pageSize: pager.pageSize,
                afterId: pager.afterId,
                sortBy: pager.sortBy,
                direction: pager.direction,
            },
            filters
        }
    });

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

    if (error) {
        addToast(t('Conference.ConferenceListError', error, 'error'))
    }

    if (loading) {
        return <LoadingFakeText lines={10} />
    }

    return (<>
        <ConferenceFilters />
        <ConferenceList
            conferences={data?.conferenceList.values}
        />
    </>)
}

export default ConferenceListContainer;