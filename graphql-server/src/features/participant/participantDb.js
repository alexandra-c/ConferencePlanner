const { SQLDataSource } = require("../../utils/sqlDataSource");
const { generateTopClause, getSortByValue, generateSortByPkClause, generatePrevPageWhereClause, generateOrderByClause } = require("../common/dbGenerators")

class ParticipantDb extends SQLDataSource {

    generateFromAndWhereClause(queryBuilder, { afterId, filters = {}, direction, sortBy, sortByValue }) {
        const { startDate, endDate } = filters;

        queryBuilder.from("Conference");

        if (startDate) queryBuilder.whereRaw("StartDate", ">=", startDate);
        if (endDate) queryBuilder.whereRaw("EndDate", "<=", endDate);

        if (afterId) {
            queryBuilder.modify(generateSortByPkClause, { sortBy, pk: "FlowId", direction, afterId, sortByValue })
        }
    }

    async getParticipantListTotalCount(filters = {}) {
        return await this.knex
            .count("Id", { as: "TotalCount" })
            .modify(this.generateFromAndWhereClause, { filters })
            .first();
    }

    async getParticipantListPreviousPageAfterId(pager, filters, sortByValue) {
        const { pageSize, afterId, sortBy = "Name", direction = 0 } = pager;
        const prevPage = await this.knex
            .select("Id")
            .modify(this.generateFromAndWhereClause, { filters })
            .modify(generateOrderByClause, { sortBy, direction: !direction, pk: "Id" })
            .modify(generatePrevPageWhereClause, { afterId, direction, sortBy, sortByValue, pk: "Id" })
            .modify(generateTopClause, pageSize);

        return prevPage[pageSize - 1];
    }

    async getParticipantList(pager, filters) {
        const { pageSize, sortBy = "Name", direction = 0, afterId } = pager;
        const sortByValue = await getSortByValue(this.knex, afterId, sortBy, "Conference", "Id");
        const values = await this.knex
            .select(
                "Id",
                "ConferenceTypeId",
                "LocationId",
                "CategoryId",
                "StartDate",
                "EndDate"
            )
            .from("Conference")
            .modify(this.generateFromAndWhereClause, { filters, afterId, direction, sortBy, sortByValue })
            .modify(generateOrderByClause, { sortBy, direction, pk: "Id" })
            .modify(generateTopClause, pageSize ? pageSize + 1 : null);
        return { values, sortByValue };
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
        return data;
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
        return data;
    }

    async getCityInfo(cityId) {
        const data = await this.knex
            .select(
                "Id",
                "Name"
            )
            .from("DictionaryCity")
            .where("Id", cityId)
        return data;
    }

    async getCountyInfo(countyId) {
        const data = await this.knex
            .select(
                "Id",
                "Name"
            )
            .from("DictionaryCounty")
            .where("Id", countyId)
        return data;
    }

    async getCountryInfo(countryId) {
        const data = await this.knex
            .select(
                "Id",
                "Name"
            )
            .from("DictionaryCountry")
            .where("Id", countryId)
        return data;
    }
}

module.exports = ParticipantDb;