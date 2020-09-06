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
                "EndDate",
                "OrganizerEmail"
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
            Code: location.code,
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
            "Code",
            "Address",
            "Latitude",
            "Longitude",
            "CityId",
            "CountyId",
            "CountryId"
        ]

        const result = await this.knex('Location')
            .returning(output)
            .insert(content)
        return result[0]
    }

    async updateConference({ id, name, organizerEmail, startDate, endDate, locationId, categoryId, typeId }) {
        const content = {
            Name: name,
            OrganizerEmail: organizerEmail,
            StartDate: startDate,
            EndDate: endDate,
            LocationId: locationId,
            ConferenceTypeId: typeId,
            CategoryId: categoryId
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

    async updateSpeaker({ speaker, conferenceId }) {
        const { id, name, nationality, rating, isMainSpeaker } = speaker
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
            const resultSpeaker = await this.knex('Speaker')
                .update(content, outputSpeaker)
                .where("Id", id)
            const resultSpeakerX = await this.knex('ConferenceXSpeaker')
                .update({ IsMainSpeaker: isMainSpeaker }, "IsMainSpeaker")
                .where("SpeakerId", id)
                .andWhere("ConferenceId", conferenceId)
            result = { ...resultSpeaker, ...resultSpeakerX }
        }
        else {
            const insertedSpeaker = await this.knex('Speaker')
                .returning(outputSpeaker)
                .insert(content)

            const insertedSpeakerX = await this.knex('ConferenceXSpeaker')
                .returning("IsMainSpeaker")
                .insert({ SpeakerId: insertedSpeaker[0].id, IsMainSpeaker: isMainSpeaker, ConferenceId: conferenceId })
            result = { ...insertedSpeaker[0], ...insertedSpeakerX }
        }
        return result
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