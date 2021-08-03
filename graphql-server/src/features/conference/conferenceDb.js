const { SQLDataSource } = require("../../utils/sqlDataSource");

class ConferenceDb extends SQLDataSource {

    generateWhereClause(queryBuilder, filters = {}) {
        const { startDate, endDate, organizerEmail } = filters;

        if (startDate) queryBuilder.andWhere("StartDate", ">=", startDate);
        if (endDate) queryBuilder.andWhere("EndDate", "<=", endDate);
        if (organizerEmail) queryBuilder.andWhere("OrganizerEmail", organizerEmail)
    }

    async getConferenceList(pager, filters) {
        const { page, pageSize } = pager;
        const values = await this.knex
            .select(
                "Id",
                "Name",
                "ConferenceTypeId",
                "LocationId",
                "CategoryId",
                "StartDate",
                "EndDate"
            )
            .from("Conference")
            .modify(this.generateWhereClause, filters)
            .orderBy("Id")
            .offset(page * pageSize)
            .limit(pageSize)
        return { values };
    }

    async getConferenceListTotalCount(filters = {}) {
        return await this.knex("Conference")
            .count("Id", { as: "TotalCount" })
            .modify(this.generateWhereClause, filters)
            .first();
    }

    async insertTypeDictionary(typeDictionary) {
        const content = {
            Name: typeDictionary.name,
            Code: typeDictionary.code
        }

        const result = await this.knex('DictionaryConferenceType')
            .returning("Id")
            .insert(content)
        return result[0]
    }

    async insertCategoryDictionary(categoryDictionary) {
        const content = {
            Name: categoryDictionary.name,
            Code: categoryDictionary.code
        }

        const result = await this.knex('DictionaryCategory')
            .returning("Id")
            .insert(content)
        return result[0]
    }

    async updateLocation(location) {
        const content = {
            Name: location.name,
            Address: location.address,
            Latitude: location.latitude,
            Longitude: location.longitude,
            CityId: location.cityId,
            CountyId: location.countyId,
            CountryId: location.countyId
        }
        const output = [
            "Id",
            "Name",
            "Address",
            "Latitude",
            "Longitude",
            "CityId",
            "CountyId",
            "CountryId"
        ]

        let result
        if (location.id) {
            result = await this.knex('Location')
                .update(content, output)
                .where("Id", location.id)
        }
        else {
            result = await this.knex('Location')
                .returning(output)
                .insert(content)
        }

        return result[0]
    }

    async updateConference({ id, name, organizerEmail, startDate, endDate, location, category, type }) {
        const content = {
            Name: name,
            OrganizerEmail: organizerEmail,
            StartDate: startDate,
            EndDate: endDate,
            LocationId: location.id,
            ConferenceTypeId: type.id,
            CategoryId: category.id
        }
        const output = [
            "Id",
            "ConferenceTypeId",
            "LocationId",
            "OrganizerEmail",
            "CategoryId",
            "StartDate",
            "EndDate",
            "Name"
        ]
        let result
        if (id) {
            result = await this.knex('Conference')
                .update(content, output)
                .where("Id", id)
        }
        else {
            result = await this.knex('Conference')
                .returning(output)
                .insert(content)
        }
        return result[0]
    }

    async updateSpeaker({ id, name, nationality, rating }) {
        const content = {
            Name: name,
            Nationality: nationality,
            Rating: rating
        }
        const outputSpeaker = [
            "Id",
            "Name",
            "Nationality",
            "Rating"
        ]
        let result
        if (id > 0) {
            result = await this.knex('Speaker')
                .update(content, outputSpeaker)
                .where("Id", id)
        }
        else {
            result = await this.knex('Speaker')
                .returning(outputSpeaker)
                .insert(content)
        }
        return result[0]
    }

    async updateConferenceXSpeaker({ speakerId, isMainSpeaker, conferenceId }) {
        const current = await this.knex
            .select("Id")
            .from("ConferenceXSpeaker")
            .where("SpeakerId", speakerId)
            .andWhere("ConferenceId", conferenceId)
            .first()
            
        let result
        if (current?.id) {
            result = await this.knex('ConferenceXSpeaker')
                .update({ IsMainSpeaker: Boolean(isMainSpeaker) }, "IsMainSpeaker")
                .where("Id", current?.id)
        }
        else {
            result = await this.knex('ConferenceXSpeaker')
                .returning("IsMainSpeaker")
                .insert({ SpeakerId: speakerId, IsMainSpeaker: Boolean(isMainSpeaker), ConferenceId: conferenceId })
        }
        return result[0]
    }

    async deleteSpeaker(speakerIds) {
        await this.knex("ConferenceXSpeaker")
            .whereIn("SpeakerId", speakerIds)
            .del()
        await this.knex("Speaker")
            .whereIn("Id", speakerIds)
            .del()
    }

    async updateConferenceXAttendee({ attendeeEmail, conferenceId, statusId }) {
        const current = await this.knex
            .select("Id", "AttendeeEmail", "ConferenceId")
            .from("ConferenceXAttendee")
            .where("AttendeeEmail", attendeeEmail)
            .andWhere("ConferenceId", conferenceId)
            .first()

        const attendeeInfo = {
            AttendeeEmail: attendeeEmail,
            ConferenceId: conferenceId,
            StatusId: statusId
        }
        let result
        if (current && current.id) {
            result = await this.knex("ConferenceXAttendee")
                .update(attendeeInfo, "StatusId")
                .where("Id", current.id)
        } else {
            result = await this.knex("ConferenceXAttendee")
                .returning("StatusId")
                .insert(attendeeInfo);

        }
        return result[0]
    }

    async deleteConference(id) {
        let result
        await this.knex("ConferenceXAttendee")
            .where("ConferenceId", id)
            .del()
        await this.knex("ConferenceXSpeaker")
            .where("ConferenceId", id)
            .del()

        result = await this.knex("Conference")
            .where("Id", id)
            .returning("Name")
            .del()
        return result[0]
    }
}

module.exports = ConferenceDb;