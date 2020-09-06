const { randomCharacters } = require("../../utils/functions");

const conferenceResolvers = {
    Query: {
        conferenceList: async (_parent, { pager, filters }, { dataSources }, _info) => {
            const data = await dataSources.conferenceDb.getConferenceList(pager, filters);
            return data
        },
        myConference: async (_parent, { id }, { dataLoaders }, _info) => {
            const result = await dataLoaders.conferenceById.load(id);
            return result;
        }
    },
    ConferenceList: {
        pagination: async (_parent, { pager, filters }, { dataSources }, _info) => {
            const { totalCount } = await dataSources.conferenceDb.getConferenceListTotalCount(filters);
            return { currentPage: pager, totalCount };
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
        },
        saveConference: async (_parent, { input }, { dataSources }, _info) => {
            const typeId = input.type.id || await dataSources.conferenceDb.insertTypeDictionary(input.type);
            const categoryId = input.category.id || await dataSources.conferenceDb.insertCategoryDictionary(input.category);
            const location = await dataSources.conferenceDb.updateLocation(input.location);

            const updatedConference = await dataSources.conferenceDb.updateConference({
                ...input,
                categoryId,
                typeId,
                locationId: location.id
            })

            const speakers = await Promise.all(input.speakers.map(async speaker => {
                const updatedSpeaker = await dataSources.conferenceDb.updateSpeaker({ speaker, conferenceId: updatedConference.id });
                return updatedSpeaker
            }))

            return { ...updatedConference, location, speakers }
        },
        deleteConference: async (_parent, { id }, { dataSources }, _info) => {
            const name = await dataSources.conferenceDb.deleteConference(id);
            return name
        }
    }
};

module.exports = conferenceResolvers;