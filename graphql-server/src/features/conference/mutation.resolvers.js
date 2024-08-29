const { prisma } = require('../../prisma')
const { map } = require('ramda')

const conferenceMutationResolvers = {
  Mutation: {
    saveConference: async (_parent, { input }, { dataSources }, _info) => {
      const result = await prisma().$transaction(async prismaClient => {
        //we deconstruct the input object so we can use its nested properties in the following sections
        const { id, type, category, location, speakers, deletedSpeakers, ...conferenceInput } = input
        const { id: locationId, ...locationInput } = location

        //we use the upsert method to update the location if it already exists or create it if it doesn't
        const upsertedLocation = await prismaClient.location.upsert({
          where: { id: locationId || -1 },
          update: locationInput,
          create: locationInput
        })

        //we define a conference object that can be used for both create and update operations
        const conference = {
          ...conferenceInput,
          dictionaryConferenceType: {
            connect: { id: type.id }
          },
          dictionaryCategory: {
            connect: { id: category.id }
          },
          location: {
            connect: { id: upsertedLocation.id }
          }
        }

        //we use the upsert method to update the conference if it already exists or create it if it doesn't
        const updatedConference = await prismaClient.conference.upsert({
          where: { id: id || -1 },
          update: conference,
          create: conference,
          include: { location: true }
        })

        //disconnect the deleted speakers from the conference
        await prismaClient.conferenceXSpeaker.deleteMany({ where: { conferenceId: id, speakerId: { in: deletedSpeakers } } })

        await Promise.all(
          //we iterate over the speakers array and use the upsert method to update the speaker if it already exists or create it if it doesn't
          map(async ({ id: speakerId, isMainSpeaker, ...speaker }) => {
            const upsertedSpeaker = await prismaClient.speaker.upsert({
              where: { id: speakerId },
              update: speaker,
              create: speaker
            })

            //we use the upsert method to update the conferenceXSpeaker if it already exists or create it if it doesn't
            await prismaClient.conferenceXSpeaker.upsert({
              where: { conferenceId_speakerId: { conferenceId: updatedConference.id, speakerId: upsertedSpeaker.id } },
              update: { isMainSpeaker },
              create: { conferenceId: updatedConference.id, speakerId: upsertedSpeaker.id, isMainSpeaker }
            })
          }, speakers)
        )

        return updatedConference
      })

      // await Promise.all(
      //   map(async speaker => {
      //     await dataSources.conferenceApi.sendSMSNotification({
      //       conferenceId: result.id,
      //       receiverId: speaker.id
      //     })
      //   }, input.speakers)
      // )
      return result
    },
    deleteConference: async (_parent, { id }, _ctx, _info) => {
      const result = await prisma().$transaction(async prismaClient => {
        await prismaClient.conferenceXAttendee.deleteMany({ where: { conferenceId: id } })
        await prismaClient.feedback.deleteMany({ where: { conferenceId: id } })

        const conferenceXSpeakers = await prismaClient.conferenceXSpeaker.findMany({
          where: { conferenceId: id },
          select: { speakerId: true }
        })

        // Extract speaker IDs
        const speakerIds = conferenceXSpeakers.map(cxs => cxs.speakerId)

        // Optionally delete the speakers if they are not associated with other conferences
        await prismaClient.speaker.deleteMany({
          where: {
            id: { in: speakerIds },
            conferenceXSpeaker: { none: {} } // Check if the speaker is not related to any other conferences
          }
        })

        await prismaClient.conferenceXSpeaker.deleteMany({ where: { conferenceId: id } })

        const conference = await prismaClient.conference.findUnique({
          where: { id },
          select: { name: true, locationId: true }
        })
        await prismaClient.conference.delete({ where: { id } })
        if (conference?.locationId) await prismaClient.location.delete({ where: { id: conference.locationId } })

        return conference.name
      })
      return result
    }
  }
}

module.exports = conferenceMutationResolvers
