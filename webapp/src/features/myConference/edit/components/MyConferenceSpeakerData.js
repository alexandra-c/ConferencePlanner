import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles, Checkbox } from '@material-ui/core';
import { Tr, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import tableStyle from 'assets/jss/components/tableStyle';
import { CustomTextField, DeleteButton } from '@bit/totalsoft_oss.react-mui.kit.core';
import { onTextBoxChange, onCheckBoxChange } from 'utils/propertyChangeAdapters';

const useStyles = makeStyles(tableStyle);

const MyConferenceSpeakerData = ({ speaker, dispatch, index }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value, index })

    return <Tr>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                value={speaker?.name}
                onChange={onTextBoxChange(handleDispatch("speakerName"))}
            />
        </Td>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                value={speaker?.nationality}
                onChange={onTextBoxChange(handleDispatch("nationality"))}
            />
        </Td>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                isNumeric
                value={speaker?.rating}
                onChange={handleDispatch("rating")}
            />
        </Td>
        <Td className={classes.tableContent}>
            <Checkbox
                color='secondary'
                checked={Boolean(speaker?.isMainSpeaker)}
                onChange={onCheckBoxChange(handleDispatch("isMainSpeaker"))}
            />
        </Td>
        <Td className={classes.tableContent}>
            <DeleteButton onClick={handleDispatch('deleteSpeaker')} title={t('General.Buttons.DeleteSpeaker')} />
        </Td>
    </Tr>
};

MyConferenceSpeakerData.propTypes = {
    speaker: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
}

export default MyConferenceSpeakerData;