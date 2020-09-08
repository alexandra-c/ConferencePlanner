import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Autocomplete from 'components/common/select/Autocomplete';
import { useApolloClient } from '@apollo/client';
import { CONFERENCE_TYPE_QUERY } from '../queries/MyConferenceQuery';

const ConferenceType = ({ type, dispatch }) => {
    const { t } = useTranslation();
    const client = useApolloClient();

    const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value })

    const loadOptions = useCallback(async () => {
        const { data } = await client.query(CONFERENCE_TYPE_QUERY, { fetchPolicy: 'network-only' })

        if (!data) {
            return [];
        }

        return data.typeList
    }, [client])

    return <Autocomplete
        fullWidth
        creatable
        label={t('Conference.Type')}
        loadOptions={loadOptions}
        isClearable
        isSearchable
        onChange={handleDispatch('type')}
        value={type}
        createdLabel='Conference.Type'
    />
}

ConferenceType.propTypes = {
    type: PropTypes.object,
    dispatch: PropTypes.func.isRequired
}

export default ConferenceType;