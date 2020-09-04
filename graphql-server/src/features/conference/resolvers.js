const conferenceResolvers = {
    Query: {
        conferenceList: async (_parent, { pager, filters }, { dataSources }) => {
            const { pageSize } = pager;
            const data = await dataSources.conferenceDb.getConferenceList(pager, filters);
            const { values, sortByValue } = data;
            return { values: values.slice(0, pageSize), nextAfterId: values[pageSize], sortByValue }
        }
    },
    ConferenceList: {
        pagination: async ({ nextAfterId, sortByValue }, { pager, filters }, { dataSources }) => {
            const { totalCount } = await dataSources.conferenceDb.getConferenceListTotalCount(filters);
            const prevPageId = await dataSources.conferenceDb.getConferenceListPreviousPageAfterId(pager, filters, sortByValue);
            const prevPage = { ...pager, afterId: prevPageId && prevPageId.id };
            const nextPage = { ...pager, afterId: nextAfterId ? nextAfterId.id : null };
            return { totalCount, prevPage, nextPage };
        }
    },
    Conference: {
        speakers: async (_parent, _params, { dataSources }) => {
            const speakers = await dataSources.conferenceDb.getSpeaker();
            return speakers;
        },
        type: async ({ conferenceTypeId }, _params, { dataSources }) => {
            const conferenceType = await dataSources.conferenceDb.getConferenceType(conferenceTypeId);
            return conferenceType.name;
        },
        category: async ({ categoryId }, _params, { dataSources }) => {
            const category = await dataSources.conferenceDb.getCategory(categoryId);
            return category.name;
        },
        status: async (_parent, _params, { dataSources }) => {
            const statusInfo = await dataSources.conferenceDb.getStatus()
            return statusInfo.name
        },
        location: async ({ locationId }, _params, { dataSources }) => {
            const location = await dataSources.conferenceDb.getLocation(locationId);
            return location;
        }
    },
    Location: {
        city: async ({ cityId }, _params, { dataSources }) => {
            const city = await dataSources.conferenceDb.getCity(cityId);
            return city;
        },
        county: async ({ countyId }, _params, { dataSources }) => {
            const county = await dataSources.conferenceDb.getCounty(countyId);
            return county;
        },
        country: async ({ countryId }, _params, { dataSources }) => {
            const country = await dataSources.conferenceDb.getCountry(countryId);
            return country;
        }
    }
};

module.exports = conferenceResolvers;