import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles, Checkbox } from '@material-ui/core';
import { Tr, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import tableStyle from 'assets/jss/components/common/tableStyle';
import CustomTextField from 'components/common/inputs/CustomTextField';
import DeleteButton from 'components/common/buttons/DeleteButton';

const useStyles = makeStyles(tableStyle);

const MyConferenceSpeakerData = ({ speaker }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return <Tr>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                value={speaker?.name}
                onChange={() => { }}
            />
        </Td>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                value={speaker?.nationality}
                onChange={() => { }}
            />
        </Td>
        <Td className={classes.tableContent}>
            <CustomTextField
                fullWidth
                value={speaker?.rating}
                onChange={() => { }}
            />
        </Td>
        <Td className={classes.tableContent}>
            <Checkbox
                color='secondary'
                checked={Boolean(speaker?.isMainSpeaker)}
                onChange={() => { }}
            />
        </Td>
        <Td className={classes.tableContent}>
            <DeleteButton onClick={() => { }} title={t('General.Buttons.DeleteSpeaker')} />
        </Td>
    </Tr>
};

MyConferenceSpeakerData.propTypes = {
    speaker: PropTypes.object.isRequired
}

export default MyConferenceSpeakerData;