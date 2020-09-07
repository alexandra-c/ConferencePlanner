const DataLoader = require("dataloader");

const getConferenceLoaders = dbInstance => {
    return {
        conferenceById: new DataLoader(ids =>
            dbInstance
                .select(
                    "Id",
                    "ConferenceTypeId",
                    "LocationId",
                    "OrganizerEmail",
                    "CategoryId",
                    "StartDate",
                    "EndDate",
                    "Name"
                )
                .from("Conference")
                .whereIn("Id", ids)
                .then(rows => ids.map(id => rows.find(x => x.id === parseInt(id))))
        ),
        locationById: new DataLoader(ids =>
            dbInstance
                .select(
                    "Id",
                    "Name",
                    "Code",
                    "Address",
                    "Latitude",
                    "Longitude",
                    "CityId",
                    "CountyId",
                    "CountryId"
                )
                .from("Location")
                .whereIn("Id", ids)
                .then(rows => ids.map(id => rows.find(x => x.id === id)))
        ),
        speakersByConferenceId: new DataLoader(ids =>
            dbInstance
                .select(
                    "s.Id",
                    "s.Name",
                    "s.Nationality",
                    "s.Rating",
                    "c.ConferenceId",
                    "c.isMainSpeaker"
                )
                .from("ConferenceXSpeaker AS c")
                .innerJoin("Speaker AS s", "c.SpeakerId", "=", "s.Id")
                .whereIn("c.ConferenceId", ids)
                .then(rows => ids.map(id => rows.filter(x => x.conferenceId === id)))
        ),
        statusByConferenceId: new DataLoader(ids =>
            dbInstance
                .select(
                    "dS.Id",
                    "dS.Name",
                    "c.ConferenceId",
                    "c.AttendeeEmail"
                )
                .from("ConferenceXAttendee AS c")
                .innerJoin("DictionaryStatus AS dS", "c.StatusId", "=", "dS.Id")
                .whereIn("c.ConferenceId", ids.map(x => x.id))
                .whereIn("c.AttendeeEmail", ids.map(x => x.userEmail))
                .then(rows => ids.map(i => rows.find(x => x.conferenceId === i.id && x.attendeeEmail === i.userEmail)))
        )
    };

};

module.exports = { getConferenceLoaders };