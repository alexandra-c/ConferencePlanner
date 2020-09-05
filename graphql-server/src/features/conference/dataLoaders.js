const DataLoader = require("dataloader");

const getConferenceLoaders = dbInstance => {
    return {
        conferenceById: new DataLoader(ids =>
            dbInstance
                .select(
                    "Id",
                    "ConferenceTypeId",
                    "LocationId",
                    "OrganiserEmail",
                    "CategoryId",
                    "StartDate",
                    "EndDate",
                    "Name"
                )
                .from("Conference")
                .whereIn("Id", ids)
                .then(rows => ids.map(id => rows.find(x => x.id === id)))
        ),
        categoryByIds: new DataLoader(ids =>
            dbInstance
                .select(
                    "Id",
                    "Name",
                    "Code"
                )
                .from("DictionaryCategory")
                .whereIn("Id", ids)
                .then(rows => ids.map(id => rows.find(x => x.id === id)))
        ),
        conferenceTypeByIds: new DataLoader(ids =>
            dbInstance
                .select(
                    "Id",
                    "Name", 
                    "Code"
                )
                .from("DictionaryConferenceType")
                .whereIn("Id", ids)
                .then(rows => ids.map(id => rows.find(x => x.id === id)))
        ),
        locationByIds: new DataLoader(ids =>
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
        cityByIds: new DataLoader(ids =>
            dbInstance
                .select(
                    "Id",
                    "Name",
                    "Code"
                )
                .from("DictionaryCity")
                .whereIn("Id", ids)
                .then(rows => ids.map(id => rows.find(x => x.id === id)))
        ),
        countyByIds: new DataLoader(ids =>
            dbInstance
                .select(
                    "Id",
                    "Name",
                    "Code"
                )
                .from("DictionaryCounty")
                .whereIn("Id", ids)
                .then(rows => ids.map(id => rows.find(x => x.id === id)))
        ),
        countryByIds: new DataLoader(ids =>
            dbInstance
                .select(
                    "Id",
                    "Name",
                    "Code"
                )
                .from("DictionaryCountry")
                .whereIn("Id", ids)
                .then(rows => ids.map(id => rows.find(x => x.id === id)))
        )
    };

};

module.exports = { getConferenceLoaders };