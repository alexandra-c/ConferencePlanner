import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography, Grid } from '@material-ui/core';
import qr from "assets/img/qr.png";

const ConferenceCodeModal = ({ code }) => {
    const { t } = useTranslation();

    return <Grid container justify={"center"}>
        <Grid item>
            <img src={qr} alt="QR" />
        </Grid>
        <Grid item>
            <Typography>{t("Conferences.QRCodeMessage", { code })}</Typography>
        </Grid>
    </Grid>
}

ConferenceCodeModal.propTypes = {
    code: PropTypes.string.isRequired
}

export default ConferenceCodeModal;