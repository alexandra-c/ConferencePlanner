import React from 'react';
import { useTranslation } from 'react-i18next';
import RegularCard from 'components/common/cards/RegularCard';
import { Grid } from '@material-ui/core';
import Button from 'components/common/buttons/Button';
import Typography from 'components/common/inputs/Typography';
import RoomIcon from '@material-ui/icons/Room';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import conferences from '../mockFile';

const ConferenceList = () => {
    const { t } = useTranslation();

    return (<>
        <Grid container spacing={2}>
            {conferences.map(conference =>
                <Grid item xs={12} lg={4} key={conference.id}>
                    <RegularCard
                        cardTitle={conference.name}
                        cardSubtitle={
                            <Grid container item lg={12}>
                                <Grid item lg={1}>
                                    <PermIdentityIcon />
                                </Grid>
                                <Grid item lg={11}>
                                    <Typography>{t('Conferences.Speaker')}</Typography>
                                    <Typography>{conference.speaker?.name}</Typography>
                                </Grid>
                                <Grid item lg={1}>
                                    <RoomIcon />
                                </Grid>
                                <Grid item lg={11}>
                                    <Typography>{conference.location?.county.name + ", " + conference.location?.country.name}</Typography>
                                </Grid>
                            </Grid>}
                        content={<>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="error">{conference.status}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>{conference.startDate + ' - ' + conference.endDate}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>{conference.type + ' , ' + conference.category}</Typography>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button right color="success" size={"sm"}>{t('Conferences.Join')}</Button>
                                    <Button right color="danger" size={"sm"}>{t('Conferences.Withdraw')}</Button>
                                    <Button right color="info" size={"sm"}>{t('Conferences.Attend')}</Button>
                                </Grid>
                            </Grid>
                        </>}
                    />
                </Grid>
            )}
        </Grid >
    </>)
}

export default ConferenceList;