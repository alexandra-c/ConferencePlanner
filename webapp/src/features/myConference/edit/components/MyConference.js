import React from 'react';
import PropTypes from 'prop-types';
import IconCard from 'components/common/cards/IconCard';
import MyConferenceInfo from './MyConferenceInfo';
import MyConferenceLocation from './MyConferenceLocation';
import MyConferenceSpeakers from './MyConferenceSpeakers';
import { Info, Face, LocationOn } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import AddButton from 'components/common/buttons/AddButton';
import CardTitle from 'components/common/cards/CardTitle';

const MyConference = ({ conference, types, categories, countries, counties, cities, onPropertyChange, onRemoveSpeaker }) => {
    const { t } = useTranslation();
    const minId = Math.min(...conference.speakers.map(s => s.id), 0)
    const handleAddSpeaker = () => onPropertyChange(`speakers.[${conference.speakers.length}]`)({ id: minId - 1 })
    const handleLocationChange = propName => value => onPropertyChange(`location.${propName}`)(value)

    return <>
        <IconCard
            icon={Info}
            title={t("Conference.Info")}
            content={
                <MyConferenceInfo
                    conference={conference}
                    types={types}
                    categories={categories}
                    onPropertyChange={onPropertyChange}
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
                    onLocationChange={handleLocationChange}
                />
            }
        />
        <IconCard
            icon={Face}
            title={
                <CardTitle
                    title={t("Conference.Speakers")}
                    actions={[<AddButton key='addButton' title={t("General.Buttons.AddSpeaker")} onClick={handleAddSpeaker} />]}
                />
            }
            content={
                <MyConferenceSpeakers
                    conference={conference}
                    onPropertyChange={onPropertyChange}
                    onRemoveSpeaker={onRemoveSpeaker}
                />
            }
        />
    </>
}

MyConference.propTypes = {
    conference: PropTypes.object.isRequired,
    onPropertyChange: PropTypes.func.isRequired,
    onRemoveSpeaker: PropTypes.func.isRequired,
    types: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    counties: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired
}

export default MyConference;