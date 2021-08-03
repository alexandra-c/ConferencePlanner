import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { DateTime, Button, IconCard } from '@bit/totalsoft_oss.react-mui.kit.core';
import { Search } from '@material-ui/icons';
import { emptyObject } from 'utils/constants';
import { curry } from 'lodash';

const ConferenceFilters = ({ filters, onApplyFilters }) => {
    const { t } = useTranslation();
    const [localFilters, setLocalFilters] = useState(filters);

    const handleFilterPropertyChange = curry((prop, value) => setLocalFilters(prevFilters => ({ ...prevFilters, [prop]: value })));
    const handleApplyFilters = useCallback(() => onApplyFilters(localFilters), [localFilters, onApplyFilters]);
    const handleResetFilters = useCallback(() => setLocalFilters(emptyObject), []);
    const keyPressed = useCallback(({ keyCode }) => keyCode === 13 && handleApplyFilters(), [handleApplyFilters]);

    return (<>
        <IconCard
            icon={Search}
            iconColor={"theme"}
            content={
                <div onKeyDown={keyPressed} tabIndex="0">
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={3}>
                            <DateTime
                                label={t('Conferences.Filters.StartDate')}
                                value={localFilters?.startDate}
                                onChange={handleFilterPropertyChange('startDate')}
                                clearable
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <DateTime
                                label={t('Conferences.Filters.EndDate')}
                                value={localFilters?.endDate}
                                onChange={handleFilterPropertyChange('endDate')}
                                clearable
                            />
                        </Grid>
                    </Grid>
                </div>
            } />
        <Button size={"sm"} color={"primary"} right={true} onClick={handleResetFilters}>
            {t("General.Buttons.ResetFilters")}
        </Button>
        <Button size={"sm"} color={"primary"} right={true} onClick={handleApplyFilters}>
            {t("General.Buttons.ApplyFilters")}
        </Button>
    </>)
}

ConferenceFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onApplyFilters: PropTypes.func.isRequired
}

export default ConferenceFilters;