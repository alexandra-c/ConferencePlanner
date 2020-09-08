import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Autocomplete from 'components/common/select/Autocomplete';
import { useApolloClient } from '@apollo/client';
import { CATEGORY_TYPE_QUERY } from '../queries/MyConferenceQuery';

const CategoryType = ({ category, dispatch }) => {
    const { t } = useTranslation();
    const client = useApolloClient();

    const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value })

    const loadOptions = useCallback(async () => {
        const { data } = await client.query({ query: CATEGORY_TYPE_QUERY, fetchPolicy: 'network-only' })

        if (!data) {
            return [];
        }

        return data.categoryList
    }, [client])

    return <Autocomplete
        fullWidth
        creatable
        label={t('Conference.Category')}
        loadOptions={loadOptions}
        isClearable
        isSearchable
        defaultOptions
        onChange={handleDispatch('category')}
        value={category}
        createdLabel='Conference.CreateCategory'
    />
}

CategoryType.propTypes = {
    category: PropTypes.object,
    dispatch: PropTypes.func.isRequired
}

export default CategoryType;