import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Autocomplete, CustomTextField } from '@bit/totalsoft_oss.react-mui.kit.core';
import { useTranslation } from 'react-i18next';
import { onTextBoxChange } from 'utils/propertyChangeAdapters';
import { emptyString } from 'utils/constants';

const MyConferenceLocation = ({ conference, countries, counties, cities, dispatch }) => {
    const { t } = useTranslation();

    const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value })

    return <Grid item container lg={12} spacing={3}>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <CustomTextField
                    label={t('Location.Name')}
                    value={conference?.location?.name || emptyString}
                    onChange={onTextBoxChange(handleDispatch("locationName"))}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <CustomTextField
                    label={t('Location.Address')}
                    value={conference?.location?.address || emptyString}
                    onChange={onTextBoxChange(handleDispatch("address"))}
                    fullWidth
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Location.Country')}
                    fullWidth
                    value={conference?.location?.country}
                    options={countries}
                    onChange={handleDispatch("country")}
                    isClearable
                    isSearchable
                    creatable
                    createdLabel='Location.Country'
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Location.County')}
                    fullWidth
                    value={conference?.location?.county}
                    options={counties}
                    onChange={handleDispatch("county")}
                    isClearable
                    isSearchable
                    creatable
                    createdLabel='Location.County'
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Location.City')}
                    fullWidth
                    value={conference?.location?.city}
                    options={cities}
                    onChange={handleDispatch("city")}
                    isClearable
                    isSearchable
                    creatable
                    createdLabel='Location.City'
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <CustomTextField
                    label={t('Location.Latitude')}
                    value={conference?.location?.latitude || emptyString}
                    onChange={onTextBoxChange(handleDispatch("latitude"))}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <CustomTextField
                    label={t('Location.Longitude')}
                    value={conference?.location?.longitude || emptyString}
                    onChange={onTextBoxChange(handleDispatch("longitude"))}
                    fullWidth
                />
            </Grid>
        </Grid>
    </Grid>
}

MyConferenceLocation.propTypes = {
    dispatch: PropTypes.func.isRequired,
    conference: PropTypes.object.isRequired,
    countries: PropTypes.array.isRequired,
    counties: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired
}

export default MyConferenceLocation;