import React from 'react';
import { Grid, Checkbox, makeStyles } from '@material-ui/core';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { useTranslation } from 'react-i18next';
import tableStyle from 'assets/jss/components/common/tableStyle';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

const useStyles = makeStyles(tableStyle);

const ConferenceSpeakers = ({ speakers }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return <Grid className={classes.enableScrollX}>
        <Table className={classes.table}>
            <Thead>
                <Tr>
                    <Th className={classes.tableHeader}>{t('Speaker.Name')}</Th>
                    <Th className={classes.tableHeader}>{t('Speaker.Nationality')}</Th>
                    <Th className={classes.tableHeader}>{t('Speaker.Rating')}</Th>
                    <Th className={classes.tableHeader}>{t('Speaker.MainSpeaker')}</Th>
                </Tr>
            </Thead>
            <Tbody>
                {speakers?.map(speaker => (
                    <Tr key={speaker.id}>
                        <Td className={classes.tableContent}>{speaker.name}</Td>
                        <Td className={classes.tableContent}>{speaker.nationality}</Td>
                        <Td className={classes.tableContent}>{speaker.rating}</Td>
                        <Td className={classes.tableContent}>
                            <Checkbox
                                color='primary'
                                checked={Boolean(speaker.isMainSpeaker)}
                                onChange={() => {}}
                            />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table >
    </Grid>
}

export default ConferenceSpeakers;