const conferenceResolvers = {
    Query: {
        conferenceList: async (_parent, { pager, filters, organizerEmail }, { dataSources }, _info) => {
            const { pageSize } = pager;
            const data = organizerEmail ?
                await dataSources.conferenceDb.getConferenceListByOrganizer(pager, filters, organizerEmail)
                : await dataSources.conferenceDb.getConferenceList(pager, filters);
            const { values, sortByValue } = data;
            return { values: values.slice(0, pageSize), nextAfterId: values[pageSize], sortByValue }
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
        type: async ({ conferenceTypeId }, _arguments, { dataSources }, _info) => {
            const conferenceType = await dataSources.conferenceDb.getConferenceType(conferenceTypeId);
            return conferenceType.name;
        },
        category: async ({ categoryId }, _arguments, { dataSources }, _info) => {
            const category = await dataSources.conferenceDb.getCategory(categoryId);
            return category.name;
        },
        status: async (_parent, _arguments, { dataSources }, _info) => {
            const statusInfo = await dataSources.conferenceDb.getStatus()
            return statusInfo.name
        },
        location: async ({ locationId }, _arguments, { dataSources }, _info) => {
            const location = await dataSources.conferenceDb.getLocation(locationId);
            return location;
        }
    },
    Location: {
        city: async ({ cityId }, _arguments, { dataSources }, _info) => {
            const city = await dataSources.conferenceDb.getCity(cityId);
            return city;
        },
        county: async ({ countyId }, _arguments, { dataSources }, _info) => {
            const county = await dataSources.conferenceDb.getCounty(countyId);
            return county;
        },
        country: async ({ countryId }, _arguments, { dataSources }, _info) => {
            const country = await dataSources.conferenceDb.getCountry(countryId);
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