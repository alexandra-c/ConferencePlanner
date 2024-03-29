import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid, makeStyles } from '@material-ui/core';
import { Typography, SaveButton } from '@bit/totalsoft_oss.react-mui.kit.core';
import { emptyString } from 'utils/constants';

const useStyles = makeStyles((theme) => ({ title: { ...theme.header.title, width: '100%' } }));

const MyConferenceHeader = ({ headerText, onSave, saving }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container justifyContent="flex-start" alignItems="center" >
            <Grid item xs={6} sm={9} lg={9} container justifyContent="flex-start">
                <Typography variant='subtitle1' className={classes.title}>{headerText || emptyString}</Typography>
            </Grid>
            <Grid item xs={3} sm={3} lg={3} container justifyContent="flex-end" spacing={1}>
                <Grid item  >
                    {<SaveButton title={saving ? t("General.Saving") : t("General.Buttons.Save")} onClick={onSave} disabled={saving} />}
                </Grid>
            </Grid>
        </Grid>
    )
}

MyConferenceHeader.propTypes = {
    headerText: PropTypes.string,
    onSave: PropTypes.func,
    saving: PropTypes.bool
};
export default MyConferenceHeader;