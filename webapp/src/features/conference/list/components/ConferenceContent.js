import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import Typography from 'components/common/inputs/Typography';
import Button from 'components/common/buttons/Button';

const ConferenceContent = ({ status, startDate, endDate, type, category }) => {
    const { t } = useTranslation();

    return (<>
        <Grid item xs={12}>
            <Typography variant="subtitle1" color="error">{status?.name}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>{`${t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm:ss' } })} - ${t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm:ss' } })}`}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>{`${type}, ${category}`}</Typography>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button right color="success" size={"sm"}>{t('Conferences.Join')}</Button>
                <Button right color="danger" size={"sm"}>{t('Conferences.Withdraw')}</Button>
                <Button right color="info" size={"sm"}>{t('Conferences.Attend')}</Button>
            </Grid>
        </Grid>
    </>)
}

ConferenceContent.propTypes = {
    status: PropTypes.object.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
}

export default ConferenceContent;