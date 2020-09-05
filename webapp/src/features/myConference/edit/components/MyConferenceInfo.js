import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import DateTime from 'components/common/inputs/DateTime';
import CustomTextField from 'components/common/inputs/CustomTextField';
import { useTranslation } from 'react-i18next';
import Autocomplete from 'components/common/select/Autocomplete';
import { onTextBoxChange } from 'utils/propertyChangeAdapters';

const MyConferenceInfo = ({ onPropertyChange, conference, types, categories }) => {
    const { t } = useTranslation();

    return <Grid container spacing={3}>
        <Grid item container lg={9} spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
                <CustomTextField
                    label={t('Conference.Name')}
                    value={conference?.name}
                    onChange={onTextBoxChange(onPropertyChange("name"))}
                    fullWidth
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <DateTime
                    label={t('Conference.StartDate')}
                    value={conference?.startDate}
                    onChange={onPropertyChange("startDate")}
                    showTime={true}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <DateTime
                    label={t('Conference.EndDate')}
                    value={conference?.endDate}
                    onChange={onPropertyChange("endDate")}
                    showTime={true}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    fullWidth
                    value={conference?.type}
                    options={types}
                    onChange={onPropertyChange('type')}
                    isClearable={true}
                    isSearchable={true}
                    creatable={true}
                    createdLabel='Conference.Type'
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    fullWidth
                    value={conference?.category}
                    options={categories}
                    onChange={onPropertyChange('category')}
                    isClearable={true}
                    isSearchable={true}
                    creatable={true}
                    createdLabel='Conference.Category'
                />
            </Grid>
        </Grid>
    </Grid >
}

MyConferenceInfo.propTypes = {
    conference: PropTypes.object.isRequired,
    onPropertyChange: PropTypes.func.isRequired,
    types: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
}

export default MyConferenceInfo;