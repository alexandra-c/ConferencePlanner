import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import Typography from 'components/common/inputs/Typography';
import Button from 'components/common/buttons/Button';

const MyConferenceContent = ({ onEdit, conference }) => {
    const { id, startDate, endDate, type, category } = conference;
    const { t } = useTranslation();

    return (<>
        <Grid item xs={12}>
            <Typography>{`${t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm:ss' } })} - ${t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm:ss' } })}`}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>{`${type?.name}, ${category?.name}`}</Typography>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button right color="danger" size={"sm"}>{t('MyConferences.Delete')}</Button>
                <Button onClick={onEdit(id)} right color="info" size={"sm"}>{t('MyConferences.Edit')}</Button>
            </Grid>
        </Grid>
    </>)
}

MyConferenceContent.propTypes = {
    onEdit: PropTypes.func.isRequired,
    conference: PropTypes.object.isRequired
}

export default MyConferenceContent;