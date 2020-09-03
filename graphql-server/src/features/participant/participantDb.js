const { SQLDataSource } = require("../../utils/sqlDataSource");

class ParticipantDb extends SQLDataSource {

    async getParticipantList(pager, filters) {
        const { pageSize, sortBy = "Name", direction = 0, afterId } = pager;
        const values = await this.knex
            .select(
                "Id",
                "ConferenceTypeId",
                "LocationId",
                "CategoryId",
                "StartDate",
                "EndDate"
            )
    }

    // async getSpeakerIdByConferenceId(id) {
    //     const data = await this.knex
    //         .select(
    //             "SpeakerId"
    //         )
    //         .from("ConferenceXSpeaker")
    //         .where("ConferenceId", id)
    //     return data;
    // }

    async getConferenceType(conferenceTypeId) {
        const data = await this.knex
            .select(
                "Id",
                "Name"
            )
            .from("DictionaryConferenceType")
            .where("Id", conferenceTypeId)
        return data;
    }

    async getCategory(categoryId) {
        const data = await this.knex
            .select(
                "Id",
                "Name"
            )
            .from("DictionaryCategory")
            .where("Id", categoryId)
    }

    async getAddress(locationId) {
        const data = await this.knex
            .select(
                "Id",
                "CityId",
                "CountyId",
                "CountryId"
            )
            .from("Location")
            .where("Id", locationId)
    }

    async getCityInfo(cityId){
        const data = await this.knex
            .select(
                "Id",
                "Name"
            )
            .from("DictionaryCity")
            .where("Id", cityId)
    }

    async getCountyInfo(countyId){
        const data = await this.knex
            .select(
                "Id",
                "Name"
            )
            .from("DictionaryCounty")
            .where("Id", countyId)
    }

    async getCountryInfo(countryId){
        const data = await this.knex
            .select(
                "Id",
                "Name"
            )
            .from("DictionaryCountry")
            .where("Id", countryId)
    }
}

module.exports = ParticipantDb;