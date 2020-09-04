import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import DateTime from 'components/common/inputs/DateTime';
import Button from 'components/common/buttons/Button';
import IconCard from 'components/common/cards/IconCard';
import { Search } from '@material-ui/icons';
import { emptyObject } from 'utils/constants';

const MyConferenceFilters = ({ filters, onApplyFilters }) => {
    const { t } = useTranslation();
    const [localFilters, setLocalFilters] = useState(filters);

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
                                label={t('MyConferences.Filters.StartDate')}
                                value={localFilters?.startDate}
                                onChange={() => { }}
                                clearable
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <DateTime
                                label={t('MyConferences.Filters.EndDate')}
                                value={localFilters?.endDate}
                                onChange={() => { }}
                                clearable
                            />
                        </Grid>
                    </Grid>
                </div>
            } />
        <Button size={"sm"} color={"primary"} right={true} onClick={handleResetFilters}>
            {t("General.Buttons.ResetFilters")}
        </Button>
        <Button size={"sm"} color={"primary"} right={true} onClick={() => { }}>
            {t("General.Buttons.ApplyFilters")}
        </Button>
    </>)
}

MyConferenceFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onApplyFilters: PropTypes.func.isRequired
}

export default MyConferenceFilters;