const { randomCharacters } = require('../../utils/functions')

const conferenceResolvers = {
  Query: {
    conferenceList: async (_parent, { pager, filters }, { dataSources }, _info) => {
      const data = await dataSources.conferenceDb.getConferenceList(pager, filters)
      return data
    },
    conference: async (_parent, { id }, { dataLoaders }, _info) => {
      const result = await dataLoaders.conferenceById.load(id)
      return result
    }
  },
  ConferenceList: {
    pagination: async (_parent, { pager, filters }, { dataSources }, _info) => {
      const { totalCount } = await dataSources.conferenceDb.getConferenceListTotalCount(filters)
      return { currentPage: pager, totalCount }
    }
  },
  Conference: {
    speakers: async ({ id }, _arguments, { dataLoaders }, _info) => {
      const speakers = await dataLoaders.speakersByConferenceId.load(id)
      return speakers
    },
    type: async ({ conferenceTypeId }, _params, { dataLoaders }, _info) => {
      const conferenceType = await dataLoaders.conferenceTypeById.load(conferenceTypeId)
      return conferenceType
    },
    category: async ({ categoryId }, _params, { dataLoaders }, _info) => {
      const category = await dataLoaders.categoryById.load(categoryId)
      return category
    },
    status: async ({ id }, { userEmail }, { dataLoaders }, _info) => {
      const status = await dataLoaders.statusByConferenceId.load({ id, userEmail })
      return status
    },
    location: async ({ locationId }, _params, { dataLoaders }, _info) => {
      const location = await dataLoaders.locationById.load(locationId)
      return location
    }
  },
  Location: {
    city: async ({ cityId }, _params, { dataLoaders }, _info) => {
      const city = await dataLoaders.cityById.load(cityId)
      return city
    },
    county: async ({ countyId }, _params, { dataLoaders }, _info) => {
      const county = await dataLoaders.countyById.load(countyId)
      return county
    },
    country: async ({ countryId }, _params, { dataLoaders }) => {
      const country = await dataLoaders.countryById.load(countryId)
      return country
    }
  },
  Mutation: {
    attend: async (_parent, { input }, { dataSources }, _info) => {
      const updateInput = { ...input, statusId: 3 /* Attended */ }
      const statusId = await dataSources.conferenceDb.updateConferenceXAttendee(updateInput)
      const suggestedConferences = await dataSources.conferenceApi.getConferenceSuggestions(input)
      const code = statusId ? randomCharacters(10) : null
      return { suggestedConferences, code }
    },
    withdraw: async (_parent, { input }, { dataSources }, _info) => {
      const updateInput = { ...input, statusId: 2 /* Withdrawn */ }
      const statusId = await dataSources.conferenceDb.updateConferenceXAttendee(updateInput)
      return statusId
    },
    saveConference: async (_parent, { input }, { dataSources }, _info) => {
      const location = await dataSources.conferenceDb.updateLocation(input.location)

      const updatedConference = await dataSources.conferenceDb.updateConference({ ...input, location })

      const speakers = await Promise.all(
        input.speakers.map(async speaker => {
          const updatedSpeaker = await dataSources.conferenceDb.updateSpeaker(speaker)
          const isMainSpeaker = await dataSources.conferenceDb.updateConferenceXSpeaker({
            speakerId: updatedSpeaker.id,
            isMainSpeaker: speaker.isMainSpeaker,
            conferenceId: updatedConference.id
          })
          return { ...updatedSpeaker, isMainSpeaker }
        })
      )

      input.deletedSpeakers &&
        input.deletedSpeakers.length > 0 &&
        (await dataSources.conferenceDb.deleteSpeaker(input.deletedSpeakers))

      return { ...updatedConference, location, speakers }
    },
    deleteConference: async (_parent, { id }, { dataSources }, _info) => {
      const name = await dataSources.conferenceDb.deleteConference(id)
      return name
    }
  }
}

module.exports = conferenceResolvers
