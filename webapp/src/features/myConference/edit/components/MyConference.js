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

const MyConference = ({ conference, types, categories, countries, counties, cities }) => {
    const { t } = useTranslation();

    return <>
        <IconCard
            icon={Info}
            title={t("Conference.Info")}
            content={
                <MyConferenceInfo
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
                <MyConferenceLocation
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
                    actions={[<AddButton key='addButton' title={t("General.Buttons.AddSpeaker")} onClick={() => { }} />]}
                />
            }
            content={
                <MyConferenceSpeakers
                    conference={conference}
                />
            }
        />
    </>
}

MyConference.propTypes = {
    conference: PropTypes.object.isRequired,
    types: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    counties: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    // handleAddFile: PropTypes.func.isRequired
}

export default MyConference;