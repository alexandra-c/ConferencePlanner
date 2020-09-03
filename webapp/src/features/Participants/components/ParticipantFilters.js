import React from 'react';
import RegularCard from 'components/common/cards/RegularCard';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DateTime from 'components/common/inputs/DateTime';
import Button from 'components/common/buttons/Button';

const ParticipantFilters = ({ }) => {
    const { t } = useTranslation();

    return (<>
        <RegularCard
            content={
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={3}>
                        <DateTime
                            label={t('Participants.Filters.StartDate')}
                            value={""}
                            onChange={() => { }}
                            clearable
                        />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <DateTime
                            label={t('Participants.Filters.EndDate')}
                            value={""}
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

export default ParticipantFilters;