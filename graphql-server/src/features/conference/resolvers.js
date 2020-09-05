const conferenceResolvers = {
    Query: {
        conferenceList: async (_parent, { pager, filters, organizerEmail }, { dataSources }, _info) => {
            const { pageSize } = pager;
            const data = organizerEmail ?
                await dataSources.conferenceDb.getConferenceListByOrganizer(pager, filters, organizerEmail)
                : await dataSources.conferenceDb.getConferenceList(pager, filters);
            const { values, sortByValue } = data;
            return { values: values.slice(0, pageSize), nextAfterId: values[pageSize], sortByValue }
        },
        myConference: async ({ id }, _params, { dataLoaders }, _info) => {
            const result = await dataLoaders.conferenceById.load(id);
            return result;
        }
    },
    ConferenceList: {
        pagination: async ({ nextAfterId, sortByValue }, { pager, filters }, { dataSources }, _info) => {
            const { totalCount } = await dataSources.conferenceDb.getConferenceListTotalCount(filters);
            const prevPageId = await dataSources.conferenceDb.getConferenceListPreviousPageAfterId(pager, filters, sortByValue);
            const prevPage = { ...pager, afterId: prevPageId && prevPageId.id };
            const nextPage = { ...pager, afterId: nextAfterId ? nextAfterId.id : null };
            return { totalCount, prevPage, nextPage };
        }
    },
    Conference: {
        speakers: async (_parent, _arguments, { dataSources }, _info) => {
            const speakers = await dataSources.conferenceDb.getSpeaker();
            return speakers;
        },
        type: async ({ conferenceTypeId }, _params, { dataLoaders }, _info) => {
            const conferenceType = await dataLoaders.conferenceTypeByIds.load(conferenceTypeId);
            return conferenceType;
        },
        category: async ({ categoryId }, _params, { dataLoaders }, _info) => {
            const category = await dataLoaders.categoryByIds.load(categoryId);
            return category;
        },
        status: async (_parent, _arguments, { dataSources }, _info) => {
            const statusInfo = await dataSources.conferenceDb.getStatus()
            return statusInfo.name
        },
        location: async ({ locationId }, _params, { dataLoaders }, _info) => {
            const location = await dataLoaders.locationByIds.load(locationId);
            return location;
        }
    },
    Location: {
        city: async ({ cityId }, _params, { dataLoaders }, _info) => {
            const city = await dataLoaders.cityByIds.load(cityId);
            return city;
        },
        county: async ({ countyId }, _params, { dataLoaders }, _info) => {
            const county = await dataLoaders.countyByIds.load(countyId);
            return county;
        },
        country: async ({ countryId }, _params, { dataLoaders }) => {
            const country = await dataLoaders.countryByIds.load(countryId);
            return country;
        }
    },
    Mutation: {
        attend: async (_parent, { input }, { dataSources }, _info) => {
            const result = await dataSources.conferenceDb.updateConferenceXAttendee(input);
            return result.id && true;
        },
    }
};

module.exports = conferenceResolvers;