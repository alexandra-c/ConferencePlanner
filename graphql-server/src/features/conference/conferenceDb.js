const { SQLDataSource } = require("../../utils/sqlDataSource");
const { generateTopClause, getSortByValue, generateSortByPkClause, generatePrevPageWhereClause, generateOrderByClause } = require("../common/dbGenerators");

class ConferenceDb extends SQLDataSource {

    generateFromAndWhereClause(queryBuilder, { afterId, filters = {}, direction, sortBy, sortByValue }) {
        const { startDate, endDate, organizerEmail } = filters;

        queryBuilder.from("Conference");

        if (startDate) queryBuilder.whereRaw("StartDate", ">=", startDate);
        if (endDate) queryBuilder.whereRaw("EndDate", "<=", endDate);
        if (organizerEmail) queryBuilder.whereRaw("OrganiserEmail", organizerEmail)

        if (afterId) {
            queryBuilder.modify(generateSortByPkClause, { sortBy, pk: "FlowId", direction, afterId, sortByValue })
        }
    }

    async getConferenceListTotalCount(filters = {}) {
        return await this.knex
            .count("Id", { as: "TotalCount" })
            .modify(this.generateFromAndWhereClause, { filters })
            .first();
    }

    async getConferenceListPreviousPageAfterId(pager, filters, sortByValue) {
        const { pageSize, afterId, sortBy = "Name", direction = 0 } = pager;
        const prevPage = await this.knex
            .select("Id")
            .modify(this.generateFromAndWhereClause, { filters })
            .modify(generateOrderByClause, { sortBy, direction: !direction, pk: "Id" })
            .modify(generatePrevPageWhereClause, { afterId, direction, sortBy, sortByValue, pk: "Id" })
            .modify(generateTopClause, pageSize);

        return prevPage[pageSize - 1];
    }

    async getConferenceList(pager, filters) {
        const { pageSize, sortBy = "Name", direction = 0, afterId } = pager;
        const sortByValue = await getSortByValue(this.knex, afterId, sortBy, "Conference", "Id");
        const values = await this.knex
            .select(
                "Id",
                "Name",
                "ConferenceTypeId",
                "LocationId",
                "CategoryId",
                "StartDate",
                "EndDate",
                "OrganiserEmail"
            )
            .from("Conference")
            .modify(this.generateFromAndWhereClause, { filters, afterId, direction, sortBy, sortByValue })
            .modify(generateOrderByClause, { sortBy, direction, pk: "Id" })
            .modify(generateTopClause, pageSize ? pageSize + 1 : null);
        return { values, sortByValue };
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
}

module.exports = ConferenceDb;