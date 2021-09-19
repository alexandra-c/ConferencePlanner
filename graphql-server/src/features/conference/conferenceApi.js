const { RESTDataSource } = require('apollo-datasource-rest')

class ConferenceApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.API_URL
  }

  async getConferenceSuggestions(input) {
    const { conferenceId, attendeeEmail } = input
    return await this.get(`Suggestions`, { conferenceId, attendeeEmail })
  }
}

module.exports = ConferenceApi
