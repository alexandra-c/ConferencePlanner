import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from 'components/common/buttons/Button';
import Typography from 'components/common/inputs/Typography';
import RoomIcon from '@material-ui/icons/Room';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import RegularCard from 'components/common/cards/RegularCard';
import { Grid } from '@material-ui/core';

const ConferenceListItem = ({ conference, onAttend, onWithdraw }) => {
    const { t } = useTranslation();
    const { name, speaker, location, status, startDate, endDate, type, category } = conference;

    return (
        <RegularCard
            cardTitle={name}
            cardSubtitle={
                <Grid container item lg={12}>
                    <Grid item lg={1}>
                        <PermIdentityIcon />
                    </Grid>
                    <Grid item lg={11}>
                        <Typography>{t('Conferences.Speaker')}</Typography>
                        <Typography>{speaker?.name}</Typography>
                    </Grid>
                    <Grid item lg={1}>
                        <RoomIcon />
                    </Grid>
                    <Grid item lg={11}>
                        <Typography>{`${location?.county.name}, ${location?.country.name}`}</Typography>
                    </Grid>
                </Grid>}
            content={<>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" color="error">{status}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{`${startDate} - ${endDate}`}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{`${type}, ${category}`}</Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {status === "Attended"
                            ? <>
                                <Button right color="success" size={"sm"}>{t('Conferences.Join')}</Button>
                                <Button onClick={onWithdraw(conference)} right color="danger" size={"sm"}>{t('Conferences.Withdraw')}</Button>
                            </>
                            : <Button onClick={onAttend(conference)} right color="info" size={"sm"}>{t('Conferences.Attend')}</Button>
                        }
                    </Grid>
                </Grid>
            </>}
        />
    )
}

ConferenceListItem.propTypes = {
    conference: PropTypes.object.isRequired,
    onAttend: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired
}

export default ConferenceListItem;