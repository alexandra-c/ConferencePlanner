import React, { useEffect } from 'react';
import ConferenceList from './ConferenceList';
import ConferenceFilters from './ConferenceFilters';
import { useFooter } from 'providers/AreasProvider';
import Pagination from 'components/common/pagination/Pagination';

const ConferenceListContainer = () => {
    const [, setFooter] = useFooter();

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

    return (<>
        <ConferenceFilters />
        <ConferenceList />
    </>)
}

export default ConferenceListContainer;