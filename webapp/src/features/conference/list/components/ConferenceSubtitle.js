import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Typography } from '@bit/totalsoft_oss.react-mui.kit.core';
import ConferenceSpeakerInfo from './ConferenceSpeakerInfo';

const ConferenceSubtitle = ({ speaker, location }) => {
    const { t } = useTranslation();

    return (
        <Grid container item lg={12}>
            <Grid item lg={1}>
                <PermIdentityIcon />
            </Grid>
            <Grid item lg={11}>
                <Typography>{t('Conferences.Speaker')}</Typography>
                <Typography tooltip={<ConferenceSpeakerInfo speaker={speaker} />}>{speaker?.name}</Typography>
            </Grid>
            <Grid item lg={1}>
                <RoomIcon />
            </Grid>
            <Grid item lg={11}>
                <Typography>{`${location?.city.name}, ${location?.county.name}, ${location?.country.name}`}</Typography>
            </Grid>
        </Grid>
    )
}

ConferenceSubtitle.propTypes = {
    speaker: PropTypes.object,
    location: PropTypes.object.isRequired
}

export default ConferenceSubtitle;