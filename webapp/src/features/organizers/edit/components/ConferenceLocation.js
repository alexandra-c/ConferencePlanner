import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { useTranslation } from 'react-i18next';
import tableStyle from 'assets/jss/components/common/tableStyle';

const useStyles = makeStyles(tableStyle);

const ConferenceLocation = ({ countries, counties, cities }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return <Grid item container lg={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
            <Grid className={classes.enableScrollX}>
                <Table className={classes.table}>
                    <Thead>
                        <Tr>
                            <Th className={classes.tableHeader}>{t('Address.Country')}</Th>
                            <Th className={classes.tableHeader}>{t('Code')}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {countries?.map(country => (
                            <Tr key={country.id}>
                                <Td className={classes.tableContent}>{country.name}</Td>
                                <Td className={classes.tableContent}>{country.code}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table >
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
            <Grid className={classes.enableScrollX}>
                <Table className={classes.table}>
                    <Thead>
                        <Tr>
                            <Th className={classes.tableHeader}>{t('Address.County')}</Th>
                            <Th className={classes.tableHeader}>{t('Code')}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {counties?.map(county => (
                            <Tr key={county.id}>
                                <Td className={classes.tableContent}>{county.name}</Td>
                                <Td className={classes.tableContent}>{county.code}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table >
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
            <Grid className={classes.enableScrollX}>
                <Table className={classes.table}>
                    <Thead>
                        <Tr>
                            <Th className={classes.tableHeader}>{t('Address.City')}</Th>
                            <Th className={classes.tableHeader}>{t('Code')}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {cities?.map(city => (
                            <Tr key={city.id}>
                                <Td className={classes.tableContent}>{city.name}</Td>
                                <Td className={classes.tableContent}>{city.code}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table >
            </Grid>
        </Grid>
    </Grid>
}

export default ConferenceLocation;