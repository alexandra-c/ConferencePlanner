import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles, Checkbox } from '@material-ui/core';
import { Tr, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import tableStyle from 'assets/jss/components/common/tableStyle';
import CustomTextField from 'components/common/inputs/CustomTextField';
import DeleteButton from 'components/common/buttons/DeleteButton';
import { onTextBoxChange, onCheckBoxChange } from 'utils/propertyChangeAdapters';

const useStyles = makeStyles(tableStyle);

const MyConferenceSpeakerData = ({ speaker, onPropertyChange, onRemoveSpeaker }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const handleRemoveSpeaker = () => onRemoveSpeaker(speaker.id)

    return <Tr>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                value={speaker?.name}
                onChange={onTextBoxChange(onPropertyChange("name"))}
            />
        </Td>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                value={speaker?.nationality}
                onChange={onTextBoxChange(onPropertyChange("nationality"))}
            />
        </Td>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                value={speaker?.rating}
                onChange={onTextBoxChange(onPropertyChange("rating"))}
            />
        </Td>
        <Td className={classes.tableContent}>
            <Checkbox
                color='secondary'
                checked={Boolean(speaker?.isMainSpeaker)}
                onChange={onCheckBoxChange(onPropertyChange("isMainSpeaker"))}
            />
        </Td>
        <Td className={classes.tableContent}>
            <DeleteButton onClick={handleRemoveSpeaker} title={t('General.Buttons.DeleteSpeaker')} />
        </Td>
    </Tr>
};

MyConferenceSpeakerData.propTypes = {
    speaker: PropTypes.object.isRequired
}

export default MyConferenceSpeakerData;