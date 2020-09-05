import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import { useTranslation } from 'react-i18next';
import tableStyle from 'assets/jss/components/common/tableStyle';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import MyConferenceSpeakerData from './MyConferenceSpeakerData';
const useStyles = makeStyles(tableStyle);

const MyConferenceSpeakers = ({ conference, onPropertyChange, onRemoveSpeaker }) => {
    const speakers = conference.speakers;
    const { t } = useTranslation();
    const classes = useStyles();
    const handleSpeakerChange = (index) => propName => value => onPropertyChange(`speakers.[${index}].${propName}`)(value)

    return <Grid className={classes.enableScrollX}>
        <Table className={classes.table}>
            <Thead>
                <Tr>
                    <Th className={classes.tableHeader}>{t('Speaker.Name')}</Th>
                    <Th className={classes.tableHeader}>{t('Speaker.Nationality')}</Th>
                    <Th className={classes.tableHeader}>{t('Speaker.Rating')}</Th>
                    <Th className={classes.tableHeader}>{t('Speaker.MainSpeaker')}</Th>
                    <Th className={classes.tableHeader}></Th>
                </Tr>
            </Thead>
            <Tbody>
                {speakers?.map((speaker, index) => (
                    <MyConferenceSpeakerData
                        key={speaker.id}
                        speaker={speaker}
                        onPropertyChange={handleSpeakerChange(index)}
                        onRemoveSpeaker={onRemoveSpeaker}
                    />
                ))}
            </Tbody>
        </Table >
    </Grid>
}

MyConferenceSpeakers.propTypes = {
    conference: PropTypes.object.isRequired

}

export default MyConferenceSpeakers;