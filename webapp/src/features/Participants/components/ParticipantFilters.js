import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import RegularCard from 'components/common/cards/RegularCard';
import { Grid } from '@material-ui/core';
import DateTime from 'components/common/inputs/DateTime';
import Button from 'components/common/buttons/Button';

const ParticipantFilters = ({ filters }) => {
    const { t } = useTranslation();
    const [localFilters, setLocalFilters] = useState(filters);

    return (<>
        <RegularCard
            content={
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={3}>
                        <DateTime
                            label={t('Participants.Filters.StartDate')}
                            value={localFilters?.startDate}
                            onChange={() => { }}
                            clearable
                        />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <DateTime
                            label={t('Participants.Filters.EndDate')}
                            value={localFilters?.endDate}
                            onChange={() => { }}
                            clearable
                        />
                    </Grid>
                </Grid>
            }
        />
        <Button size={"sm"} color={"primary"} right={true} onClick={() => { }}>
            {t("General.Buttons.ResetFilters")}
        </Button>
        <Button size={"sm"} color={"primary"} right={true} onClick={() => { }}>
            {t("General.Buttons.ApplyFilters")}
        </Button>
    </>)
}

ParticipantFilters.propTypes = {
    filters: PropTypes.object.isRequired
}

export default ParticipantFilters;