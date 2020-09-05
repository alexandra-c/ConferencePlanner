import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from 'components/common/buttons/Button';
import Typography from 'components/common/inputs/Typography';
import RoomIcon from '@material-ui/icons/Room';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import RegularCard from 'components/common/cards/RegularCard';
import { Grid } from '@material-ui/core';

const MyConferenceListItem = ({ conference, onEdit }) => {
    const { t } = useTranslation();
    const { id, name, speaker, location, startDate, endDate, type, category } = conference;

    return <RegularCard
        cardTitle={name}
        cardSubtitle={
            <Grid container item lg={12}>
                <Grid item lg={1}>
                    <PermIdentityIcon />
                </Grid>
                <Grid item lg={11}>
                    <Typography>{t('MyConferences.Speaker')}</Typography>
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
                <Typography>{`${t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm:ss' } })} - ${t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm:ss' } })}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{`${type}, ${category}`}</Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button right color="danger" size={"sm"}>{t('MyConferences.Delete')}</Button>
                    <Button onClick={onEdit(id)} right color="info" size={"sm"}>{t('MyConferences.Edit')}</Button>
                </Grid>
            </Grid>
        </>}
    />
}

MyConferenceListItem.propTypes = {
    conference: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default MyConferenceListItem;