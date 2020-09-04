import React from 'react';
import PropTypes from 'prop-types';
import IconCard from 'components/common/cards/IconCard';
import ConferenceInfo from './ConferenceInfo';
import ConferenceLocation from './ConferenceLocation';
import ConferenceSpeakers from './ConferenceSpeakers';
import { Info, Face, LocationOn } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import AddButton from 'components/common/buttons/AddButton';
import CardTitle from 'components/common/cards/CardTitle';

const Conference = ({ conference, types, categories, countries, counties, cities, handleAddFile }) => {
    const { t } = useTranslation();

    return <>
        <IconCard
            icon={Info}
            title={t("Conference.Info")}
            content={
                <ConferenceInfo
                    conference={conference}
                    types={types}
                    categories={categories}
                />
            }
        />
        <IconCard
            icon={LocationOn}
            title={t("Conference.Location")}
            content={
                <ConferenceLocation
                    conference={conference}
                    countries={countries}
                    counties={counties}
                    cities={cities}
                />
            }
        />
        <IconCard
            icon={Face}
            title={
                <CardTitle
                    title={t("Conference.Speakers")}
                    actions={[<AddButton key='addButton' title={t("General.Buttons.AddSpeaker")} onClick={handleAddFile} />]}
                />
            }
            content={
                <ConferenceSpeakers
                    conference={conference}
                />
            }
        />
    </>
}

Conference.propTypes = {
    conference: PropTypes.object.isRequired,
    types: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    counties: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    handleAddFile: PropTypes.func.isRequired
}

export default Conference;