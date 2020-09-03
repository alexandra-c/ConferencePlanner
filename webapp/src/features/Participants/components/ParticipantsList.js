import React from 'react';
import { useTranslation } from 'react-i18next';
import RegularCard from 'components/common/cards/RegularCard';
import { Grid } from '@material-ui/core';
import Button from 'components/common/buttons/Button';
import Typography from 'components/common/inputs/Typography';
import RoomIcon from '@material-ui/icons/Room';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import participants from '../mockFile';

const ParticipantsList = ({ }) => {
    const { t } = useTranslation();

    return (
        <Grid container spacing={2}>
            {participants.map(participant =>
                <Grid item xs={12} lg={4} key={participant.id}>
                    <RegularCard
                        cardTitle={participant.name}
                        cardSubtitle={
                            <Grid container item lg={12}>
                                <Grid item lg={1}>
                                    <PermIdentityIcon />
                                </Grid>
                                <Grid item lg={11}>
                                    <Typography>{t('Participants.Speaker')}</Typography>
                                    <Typography>{participant.speakerName}</Typography>
                                </Grid>
                                <Grid item lg={1}>
                                    <RoomIcon />
                                </Grid>
                                <Grid item lg={11}>
                                    <Typography>{participant.address}</Typography>
                                </Grid>
                            </Grid>}
                        content={<>
                            <Grid item xs={12} lg={6}>
                                <Typography>{participant.startDate + ' - ' + participant.endDate}</Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography>{participant.type + ' , ' + participant.category}</Typography>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button right color="info" size={"sm"}>{t('Participants.Attend')}</Button>
                                    <Button right color="success" size={"sm"}>{t('Participants.Join')}</Button>
                                    <Button right color="danger" size={"sm"}>{t('Participants.Withdraw')}</Button>
                                </Grid>
                            </Grid>
                        </>}
                    />
                </Grid>
            )}
        </Grid >
    )
}

export default ParticipantsList;