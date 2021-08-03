import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { Typography } from '@bit/totalsoft_oss.react-mui.kit.core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const ConferenceSpeakerInfo = ({ speaker }) => {
    const { t } = useTranslation();

    return (
        <Grid container item lg={12}>
            <Grid container justify="center" alignItems="center" item lg={1}>
                <StarBorderIcon />
            </Grid>
            <Grid item lg={1}></Grid>
            <Grid container justify="flex-start" alignItems="center" item lg={10}>
                <Typography>{t('Conferences.Rating')}</Typography>
                <Typography>{speaker?.rating}</Typography>
            </Grid>
            <Grid container justify="center" alignItems="center" item lg={1}>
                <AccountBoxIcon />
            </Grid>
            <Grid item lg={1}></Grid>
            <Grid container justify="flex-start" alignItems="center" item lg={10}>
                <Typography>{t('Conferences.Nationality')}</Typography>
                <Typography>{speaker?.nationality}</Typography>
            </Grid>
        </Grid>
    )
}

ConferenceSpeakerInfo.propTypes = {
    speaker: PropTypes.object
}

export default ConferenceSpeakerInfo;