import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import IconCard from 'components/common/cards/IconCard';
import MyConferenceInfo from './MyConferenceInfo';
import MyConferenceLocation from './MyConferenceLocation';
import MyConferenceSpeakers from './MyConferenceSpeakers';
import { Info, Face, LocationOn } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import AddButton from 'components/common/buttons/AddButton';
import CardTitle from 'components/common/cards/CardTitle';

const MyConference = ({ conference, countries, counties, cities, dispatch }) => {
    const { t } = useTranslation();

    const handleAddButton = useCallback(
        () => {
            dispatch({ type: 'addSpeaker' })
        },
        [dispatch])

    return <>
        <IconCard
            icon={Info}
            title={t("Conference.Info")}
            content={
                <MyConferenceInfo
                    conference={conference}
                    dispatch={dispatch}
                />
            }
        />
        <IconCard
            icon={LocationOn}
            title={t("Conference.Location")}
            content={
                <MyConferenceLocation
                    conference={conference}
                    countries={countries}
                    counties={counties}
                    cities={cities}
                    dispatch={dispatch}
                />
            }
        />
        <IconCard
            icon={Face}
            title={
                <CardTitle
                    title={t("Conference.Speakers")}
                    actions={[<AddButton key='addButton' title={t("General.Buttons.AddSpeaker")} onClick={handleAddButton} />]}
                />
            }
            content={
                <MyConferenceSpeakers
                    conference={conference}
                    dispatch={dispatch}
                />
            }
        />
    </>
}

MyConference.propTypes = {
    conference: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    countries: PropTypes.array.isRequired,
    counties: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired
}

export default MyConference;