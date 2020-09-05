import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import Typography from 'components/common/inputs/Typography';
import Button from 'components/common/buttons/Button';
import attendeeStatus from 'constants/attendeeStatus';

const ConferenceContent = ({ onAttend, conference, onWithdraw }) => {
    const { status, startDate, endDate, type, category } = conference;
    const { t } = useTranslation();
    const noStatusSet = t('Conferences.StatusNotSet');

    return (<>
        <Grid item xs={12}>
            <Typography variant="subtitle1" color="error">{status?.name || noStatusSet}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>{`${t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm:ss' } })} - ${t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm:ss' } })}`}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>{`${type}, ${category}`}</Typography>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {status?.id === attendeeStatus.Attended
                    ? <>
                        <Button right color="success" size={"sm"}>{t('Conferences.Join')}</Button>
                        <Button onClick={onWithdraw(conference)} right color="danger" size={"sm"}>{t('Conferences.Withdraw')}</Button>
                    </>
                    :
                    status?.id === attendeeStatus.Joined
                        ?
                        < Button onClick={onWithdraw(conference)} right color="danger" size={"sm"}>{t('Conferences.Withdraw')}</Button>
                        :
                        <Button onClick={onAttend(conference)} right color="info" size={"sm"}>{t('Conferences.Attend')}</Button>
                }
            </Grid>
        </Grid>
    </>)
}

ConferenceContent.propTypes = {
    onAttend: PropTypes.func.isRequired,
    conference: PropTypes.object.isRequired,
    onWithdraw: PropTypes.func.isRequired
}

export default ConferenceContent;