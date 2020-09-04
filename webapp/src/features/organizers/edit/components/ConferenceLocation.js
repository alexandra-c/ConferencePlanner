import React from 'react';
import { Grid } from '@material-ui/core';
import Autocomplete from 'components/common/select/Autocomplete';
import CustomTextField from 'components/common/inputs/CustomTextField';
import { useTranslation } from 'react-i18next';

const ConferenceLocation = ({ conference, countries, counties, cities }) => {
    const { t } = useTranslation();

    // const loadOptionsCountries = useCallback(() => countries, [countries])
    // const loadOptionsCounties = useCallback(() => counties, [counties])
    // const loadOptionsCities = useCallback(() => cities, [cities])

    return <Grid item container lg={12} spacing={3}>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <CustomTextField
                    label={t('Location.Name')}
                    value={conference.location.name}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <CustomTextField
                    label={t('Location.Address')}
                    value={conference.location.address}
                    fullWidth
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    fullWidth
                    value={conference.location.country}
                    options={countries}
                    onChange={() => { }}
                    isClearable={true}
                    isSearchable={true}
                    creatable={true}
                    createdLabel='Location.Country'
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    fullWidth
                    value={conference.location.county}
                    options={counties}
                    onChange={() => { }}
                    isClearable={true}
                    isSearchable={true}
                    creatable={true}
                    createdLabel='Location.County'
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    fullWidth
                    value={conference.location.city}
                    options={cities}
                    onChange={() => { }}
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
                    value={conference.location.latitude}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <CustomTextField
                    label={t('Location.Longitude')}
                    value={conference.location.longitude}
                    fullWidth
                />
            </Grid>
        </Grid>
    </Grid>
}

export default ConferenceLocation;