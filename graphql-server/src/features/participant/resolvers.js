const participantResolvers = {
    Query: {
        participantList: async (_parent, { pager, filters }, { dataSources }) => {
            const { pageSize } = pager;
            const data = await dataSources.participantDb.getParticipantList(pager, filters);
            const { values, sortByValue } = data;
            return pageSize ? { values: values.slice(0, pageSize), nextAfterId: values[pageSize], sortByValue } : { values, sortByValue }
        }
    },
    ParticipantList: {
        pagination: async ({ nextAfterId, sortByValue }, { pager, filters }, { dataSources }) => {
            const { totalCount } = await dataSources.participantDb.getParticipantListTotalCount(filters);
            const prevPageId = await dataSources.participantDb.getParticipantListPreviousPageAfterId(pager, filters, sortByValue);
            const prevPage = { ...pager, afterId: prevPageId && prevPageId.id };
            const nextPage = { ...pager, afterId: nextAfterId ? nextAfterId.id : null };
            return { totalCount, prevPage, nextPage };
        }
    },
    Participant: {
        speakerName: async ({ id }, _params, { dataSources }) => {
            const speakerId = await dataSources.participantDb.getSpeakerIdByConferenceId(id);
            const speakerInfo = await dataSources.participantDb.getSpeakerInfo(speakerId);
            return speakerInfo.name;
        },
        type: async ({ conferenceTypeId }, _params, { dataSources }) => {
            const conferenceType = await dataSources.participantDb.getConferenceType(conferenceTypeId);
            return conferenceType.name;
        },
        category: async ({ categoryId }, _params, { dataSources }) => {
            const category = await dataSources.participantDb.getCategory(categoryId);
            return category.name;
        },
        status: async ({ id }, _params, { dataSources }) => {
            const statusId = await dataSources.participantDb.getStatusIdByConferenceId(id);
            const statusInfo = await dataSources.participantDb.getStatusInfo(statusId)
            return statusInfo.name
        },
        address: async ({ locationId }, _params, { dataSources }) => {
            const address = await dataSources.participantDb.getAddress(locationId);
            return address;
        }
    },
    Address: {
        city: async ({ cityId }, _params, { dataSources }) => {
            const city = await dataSources.participantDb.getCityInfo(cityId);
            return city.name;
        },
        county: async ({ countyId }, _params, { dataSources }) => {
            const county = await dataSources.participantDb.getCountyInfo(countyId);
            return county.name;
        },
        country: async ({ countryId }, _params, { dataSources }) => {
            const country = await dataSources.participantDb.getCountryInfo(countryId);
            return country.name
        }
    }
};

module.exports = participantResolvers;