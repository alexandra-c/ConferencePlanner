import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Typography, Grid } from '@material-ui/core'
import qr from 'assets/img/qr.png'
import ConferenceItem from './ConferenceItem'
import { isEmpty } from 'ramda'

const ConferenceCodeModal = ({ code, suggestedConferences, onAttend, onWithdraw }) => {
  const { t } = useTranslation()

  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid item>
          <img src={qr} alt='QR' />
        </Grid>
        <Grid item>
          <Typography>{t('Conferences.QRCodeMessage', { code })}</Typography>
        </Grid>
      </Grid>
      {!isEmpty(suggestedConferences) && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>{t('General.SuggestedConferences')}</Typography>
          </Grid>
          {suggestedConferences?.map(conference => (
            <Grid item xs={12} lg={4} key={conference.id}>
              <ConferenceItem conference={conference} onAttend={onAttend} onWithdraw={onWithdraw} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

ConferenceCodeModal.propTypes = {
  code: PropTypes.string.isRequired,
  onAttend: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  suggestedConferences: PropTypes.array
}

export default ConferenceCodeModal
