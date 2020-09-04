import React, { useCallback } from 'react';
import { makeStyles, Grid } from "@material-ui/core";
import DateTime from 'components/common/inputs/DateTime';
import CustomTextField from 'components/common/inputs/CustomTextField';
import { useTranslation } from 'react-i18next';
import styles from '../styles'
import Typography from "components/common/inputs/Typography";
import Autocomplete from 'components/common/select/Autocomplete';

const useStyles = makeStyles(styles);

const ConferenceInfo = ({ conferences, types, categories, countries, counties, cities }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const loadOptionsTypes = useCallback(async (name) => await types.filter(ftl =>
        ftl.name.toLowerCase().includes(name.toLowerCase())
    ), [types])

    const loadOptionsCategories = useCallback(async (name) => await categories.filter(ftl =>
        ftl.name.toLowerCase().includes(name.toLowerCase())
    ), [categories])

    const loadOptionsCountries = useCallback(async (name) => await countries.filter(ftl =>
        ftl.name.toLowerCase().includes(name.toLowerCase())
    ), [countries])

    const loadOptionsCounties = useCallback(async (name) => await counties.filter(ftl =>
        ftl.name.toLowerCase().includes(name.toLowerCase())
    ), [counties])

    const loadOptionsCities = useCallback(async (name) => await cities.filter(ftl =>
        ftl.name.toLowerCase().includes(name.toLowerCase())
    ), [cities])

    return <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12}>
            <Typography className={classes.paragraph} variant="subtitle1">{t("Conference.Info")}</Typography>
        </Grid>
        <Grid item container lg={9} spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
                <CustomTextField
                    label={t('Conference.Name')}
                    value={conferences[1].name}
                    fullWidth
                />
            </Grid>
        </Grid>
        <Grid item container lg={9} spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
                <DateTime
                    label={t('Conference.StartDate')}
                    value={conferences[1].startDate}
                    dateFormat={"DD-MM-YYYY"}
                    timeFormat={"HH:mm"}
                    showTime={true}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <DateTime
                    label={t('Conference.EndDate')}
                    value={conferences[1].endDate}
                    showTime={true}
                />
            </Grid>
        </Grid>
        <Grid item container lg={9} spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
                <Autocomplete
                    fullWidth
                    value={types}
                    creatable
                    loadOptions={loadOptionsTypes}
                    isClearable
                    onChange={() => { }}
                    isSearchable
                    createdLabel='Conference.Type'
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Autocomplete
                    fullWidth
                    value={categories}
                    creatable
                    loadOptions={loadOptionsCategories}
                    isClearable
                    onChange={() => { }}
                    isSearchable
                    createdLabel='Conference.Category'
                />
            </Grid>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
            <Typography className={classes.paragraph} variant="subtitle1">{t("Conference.Location")}</Typography>
        </Grid>
        <Grid item container lg={9} spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
                <Autocomplete
                    fullWidth
                    value={countries}
                    creatable
                    loadOptions={loadOptionsCountries}
                    isClearable
                    onChange={() => { }}
                    isSearchable
                    createdLabel='Location.Country'
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Autocomplete
                    fullWidth
                    value={counties}
                    creatable
                    loadOptions={loadOptionsCounties}
                    isClearable
                    onChange={() => { }}
                    isSearchable
                    createdLabel='Location.County'
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Autocomplete
                    fullWidth
                    value={cities}
                    creatable
                    loadOptions={loadOptionsCities}
                    isClearable
                    onChange={() => { }}
                    isSearchable
                    createdLabel='Location.City'
                />
            </Grid>
        </Grid>
    </Grid >
}

export default ConferenceInfo;