import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Autocomplete from 'components/common/select/Autocomplete';
import CustomTextField from 'components/common/inputs/CustomTextField';
import { useTranslation } from 'react-i18next';
import { onTextBoxChange } from 'utils/propertyChangeAdapters';

const MyConferenceLocation = ({ conference, countries, counties, cities, onLocationChange}) => {
    const { t } = useTranslation();

    return <Grid item container lg={12} spacing={3}>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <CustomTextField
                    label={t('Location.Name')}
                    value={conference?.location?.name}
                    onChange={onTextBoxChange(onLocationChange("name"))}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <CustomTextField
                    label={t('Location.Address')}
                    value={conference?.location?.address}
                    onChange={onTextBoxChange(onLocationChange("address"))}
                    fullWidth
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    fullWidth
                    value={conference?.location?.country}
                    options={countries}
                    onChange={onLocationChange("country")}
                    isClearable={true}
                    isSearchable={true}
                    creatable={true}
                    createdLabel='Location.Country'
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    fullWidth
                    value={conference?.location?.county}
                    options={counties}
                    onChange={onLocationChange("county")}
                    isClearable={true}
                    isSearchable={true}
                    creatable={true}
                    createdLabel='Location.County'
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    fullWidth
                    value={conference?.location?.city}
                    options={cities}
                    onChange={onLocationChange("city")}
                    isClearable={true}
                    isSearchable={true}
                    creatable={true}
                    createdLabel='Location.City'
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <CustomTextField
                    label={t('Location.Latitude')}
                    value={conference?.location?.latitude}
                    onChange={onTextBoxChange(onLocationChange("latitude"))}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <CustomTextField
                    label={t('Location.Longitude')}
                    value={conference?.location?.longitude}
                    onChange={onTextBoxChange(onLocationChange("longitude"))}
                    fullWidth
                />
            </Grid>
        </Grid>
    </Grid>
}

MyConferenceLocation.propTypes = {
    onLocationChange: PropTypes.func.isRequired,
    conference: PropTypes.object.isRequired,
    countries: PropTypes.array.isRequired,
    counties: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired
}

export default MyConferenceLocation;