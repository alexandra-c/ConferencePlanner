import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AddButton, Typography } from '@bit/totalsoft_oss.react-mui.kit.core';
import { Grid, makeStyles } from '@material-ui/core';
import { emptyString } from 'utils/constants';

const useStyles = makeStyles((theme) => ({ title: { ...theme.header.title, width: '100%' } }));

const MyConferenceHeader = ({ headerText, onAdd }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container justify="flex-start" alignItems="center" >
            <Grid item xs={6} sm={9} lg={9} container justify="flex-start">
                <Typography variant='subtitle1' className={classes.title}>{headerText || emptyString}</Typography>
            </Grid>
            <Grid item xs={6} sm={3} lg={3} container justify="flex-end">
                <AddButton key='addButton' title={t("General.Buttons.AddConference")} onClick={onAdd} />
            </Grid>
        </Grid>
    )
}

MyConferenceHeader.propTypes = {
    headerText: PropTypes.string,
    onAdd: PropTypes.func.isRequired
};
export default MyConferenceHeader;