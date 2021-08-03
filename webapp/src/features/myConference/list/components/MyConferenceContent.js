import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { CustomDialog, Typography, Button } from '@bit/totalsoft_oss.react-mui.kit.core';

const MyConferenceContent = ({ onEdit, conference, onDelete }) => {
    const { id, startDate, endDate, type, category } = conference;
    const { t } = useTranslation();
    const [warning, showWarning] = useState(false);

    const handleShowDialog = useCallback(() => showWarning(current => !current), []);
    const closeDialog = useCallback(() => showWarning(false), []);
    const handleDialogYes = useCallback(() => {
        showWarning(false);
        onDelete(id);
    }, [id, onDelete])

    return (<>
        <Grid item xs={12}>
            <Typography>{`${t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm:ss' } })} - ${t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm:ss' } })}`}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>{`${type?.name}, ${category?.name}`}</Typography>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button onClick={handleShowDialog} right color="danger" size={"sm"}>{t('MyConferences.Delete')}</Button>
                <Button onClick={onEdit(id)} right color="info" size={"sm"}>{t('MyConferences.Edit')}</Button>
            </Grid>
        </Grid>
        <CustomDialog
            id="showWarning"
            open={warning}
            title={t("General.Warning")}
            content={t("General.DeleteWarning")}
            onYes={handleDialogYes}
            showActions={true}
            onClose={closeDialog}
        />
    </>)
}

MyConferenceContent.propTypes = {
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    conference: PropTypes.object.isRequired
}

export default MyConferenceContent;