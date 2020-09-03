import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import { useTranslation } from 'react-i18next';

const ParticipantsList = ({ }) => {
    const { t } = useTranslation();

    return <Table>
        <Thead>
            <Tr>
                {/* <Th>{t('')}</Th> */}
            </Tr>
        </Thead>
    </Table>

}

export default ParticipantsList;