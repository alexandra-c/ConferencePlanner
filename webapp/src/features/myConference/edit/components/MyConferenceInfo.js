import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import DateTime from 'components/common/inputs/DateTime';
import CustomTextField from 'components/common/inputs/CustomTextField';
import { useTranslation } from 'react-i18next';
import Autocomplete from 'components/common/select/Autocomplete';
import { onTextBoxChange } from 'utils/propertyChangeAdapters';
import { emptyString } from 'utils/constants';
import ConferenceType from './ConferenceType';

const MyConferenceInfo = ({ dispatch, conference, categories }) => {
    const { t } = useTranslation();

    const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value })

    return <Grid container spacing={3}>
        <Grid item container lg={9} spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
                <CustomTextField
                    label={t('Conference.Name')}
                    value={conference?.name || emptyString}
                    onChange={onTextBoxChange(handleDispatch("name"))}
                    fullWidth
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <DateTime
                    label={t('Conference.StartDate')}
                    value={conference?.startDate}
                    onChange={handleDispatch("startDate")}
                    showTime={true}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <DateTime
                    label={t('Conference.EndDate')}
                    value={conference?.endDate}
                    onChange={handleDispatch("endDate")}
                    showTime={true}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <ConferenceType
                    dispatch={dispatch}
                    type={conference?.type}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Conference.Category')}
                    fullWidth
                    value={conference?.category}
                    options={categories}
                    onChange={handleDispatch('category')}
                    isClearable
                    isSearchable
                    creatable
                    createdLabel='Conference.Category'
                />
            </Grid>
        </Grid>
    </Grid >
}

MyConferenceInfo.propTypes = {
    conference: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
}

export default MyConferenceInfo;