const conferenceResolvers = {
    Query: {
        conferenceList: async (_parent, { pager, filters, organizerEmail }, { dataSources }) => {
            const { pageSize } = pager;
            const data = organizerEmail ?
                await dataSources.conferenceDb.getConferenceListByOrganizer(pager, filters, organizerEmail)
                : await dataSources.conferenceDb.getConferenceList(pager, filters);
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
        type: async ({ conferenceTypeId }, _params, { dataLoaders }) => {
            const conferenceType = await dataLoaders.conferenceByIds.load(conferenceTypeId);
            return conferenceType.name;
        },
        category: async ({ categoryId }, _params, { dataLoaders }) => {
            const category = await dataLoaders.categoryByIds.load(categoryId);
            return category.name;
        },
        status: async (_parent, _params, { dataSources }) => {
            const statusInfo = await dataSources.conferenceDb.getStatus()
            return statusInfo.name
        },
        location: async ({ locationId }, _params, { dataLoaders }) => {
            const location = await dataLoaders.locationByIds.load(locationId);
            return location;
        }
    },
    Location: {
        city: async ({ cityId }, _params, { dataLoaders }) => {
            const city = await dataLoaders.cityByIds.load(cityId);
            return city;
        },
        county: async ({ countyId }, _params, { dataLoaders }) => {
            const county = await dataLoaders.countyByIds.load(countyId);
            return county;
        },
        country: async ({ countryId }, _params, { dataLoaders }) => {
            const country = await dataLoaders.countryByIds.load(countryId);
            return country;
        }
    }
};

module.exports = conferenceResolvers;