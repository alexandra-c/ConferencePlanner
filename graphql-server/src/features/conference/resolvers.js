const { randomCharacters } = require("../../utils/functions");

const conferenceResolvers = {
    Query: {
        conferenceList: async (_parent, { pager, filters }, { dataSources }, _info) => {
            const { pageSize } = pager;
            const data = await dataSources.conferenceDb.getConferenceList(pager, filters);
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
        speakers: async ({ id }, _arguments, { dataLoaders }, _info) => {
            const speakers = await dataLoaders.speakersByConferenceId.load(id);
            return speakers;
        },
        type: async ({ conferenceTypeId }, _params, { dataLoaders }, _info) => {
            const conferenceType = await dataLoaders.conferenceTypeById.load(conferenceTypeId);
            return conferenceType;
        },
        category: async ({ categoryId }, _params, { dataLoaders }, _info) => {
            const category = await dataLoaders.categoryById.load(categoryId);
            return category;
        },
        status: async ({ id }, { userEmail }, { dataLoaders }, _info) => {
            const status = await dataLoaders.statusByConferenceId.load({ id, userEmail })
            return status
        },
        location: async ({ locationId }, _params, { dataLoaders }, _info) => {
            const location = await dataLoaders.locationById.load(locationId);
            return location;
        }
    },
    Location: {
        city: async ({ cityId }, _params, { dataLoaders }, _info) => {
            const city = await dataLoaders.cityById.load(cityId);
            return city;
        },
        county: async ({ countyId }, _params, { dataLoaders }, _info) => {
            const county = await dataLoaders.countyById.load(countyId);
            return county;
        },
        country: async ({ countryId }, _params, { dataLoaders }) => {
            const country = await dataLoaders.countryById.load(countryId);
            return country;
        }
    },
    Mutation: {
        attend: async (_parent, { input }, { dataSources }, _info) => {
            const updateInput = { ...input, statusId: 3 /* Attended */ }
            const statusId = await dataSources.conferenceDb.updateConferenceXAttendee(updateInput);
            return statusId ? randomCharacters(10) : null
        },
        withdraw: async (_parent, { input }, { dataSources }, _info) => {
            const updateInput = { ...input, statusId: 2 /* Withdrawn */ }
            const statusId = await dataSources.conferenceDb.updateConferenceXAttendee(updateInput);
            return statusId
        }
    }
};

module.exports = conferenceResolvers;