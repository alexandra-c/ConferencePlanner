const { SQLDataSource } = require("../../utils/sqlDataSource");
const { generateTopClause, getSortByValue, generateSortByPkClause, generatePrevPageWhereClause, generateOrderByClause } = require("../common/dbGenerators")

class ConferenceDb extends SQLDataSource {

    generateFromAndWhereClause(queryBuilder, { afterId, filters = {}, direction, sortBy, sortByValue }) {
        const { startDate, endDate, organiserEmail } = filters;

        queryBuilder.from("Conference");

        if (startDate) queryBuilder.whereRaw("StartDate", ">=", startDate);
        if (endDate) queryBuilder.whereRaw("EndDate", "<=", endDate);
        if (organiserEmail) queryBuilder.whereRaw("OrganiserEmail", organiserEmail)

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

    async updateConferenceXAttendee({ id, attendeeEmail, conferenceId, statusId }) {
        const current = await this.knex
            .select("Id", "ConferenceId")
            .from("ConferenceXAttendee")
            .where("Id", id)
            .andWhere("ConferenceId", conferenceId)
            .first()

        const attendeeInfo = {
            Id: id,
            AttendeeEmail: attendeeEmail,
            ConferenceId: conferenceId,
            StatusId: statusId
        }
        if (current.id) {
            return await this.knex("ConferenceXAttendee")
                .update(attendeeInfo, "Id")
                .where("Id", id)
                .andWhere("ConferenceId", conferenceId)
        } else {
            return await this.knex("ConferenceXAttendee")
                .returning("Id")
                .insert(attendeeInfo);
        }
    }
}

module.exports = ConferenceDb;