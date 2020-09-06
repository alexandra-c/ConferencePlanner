import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import Typography from 'components/common/inputs/Typography';
import Button from 'components/common/buttons/Button';
import CustomDialog from 'components/common/dialogBox/CustomDialog';

const MyConferenceContent = ({ onEdit, conference, onDelete }) => {
    const { id, startDate, endDate, type, category } = conference;
    const { t } = useTranslation();
    const [warning, showWarning] = useState(false);

    const handleDialogYes = () => {    //TO_DO: check customDialog
        showWarning(false);
        onDelete(id);
    }

    return (<>
        <Grid item xs={12}>
            <Typography>{`${t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm:ss' } })} - ${t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm:ss' } })}`}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>{`${type?.name}, ${category?.name}`}</Typography>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button onClick={showWarning(true)} right color="danger" size={"sm"}>{t('MyConferences.Delete')}</Button>
                <Button onClick={onEdit(id)} right color="info" size={"sm"}>{t('MyConferences.Edit')}</Button>
            </Grid>
        </Grid>
        <CustomDialog
            id="showWarning"
            open={warning}
            title={t("General.Warning")}
            content={t("General.DeleteWarning")}  //TO_DO: in translation
            onYes={handleDialogYes}
            showActions={true}
            onClose={showWarning(false)}
        />
    </>)
}

MyConferenceContent.propTypes = {
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    conference: PropTypes.object.isRequired
}

export default MyConferenceContent;