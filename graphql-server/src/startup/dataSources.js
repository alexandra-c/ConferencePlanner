const UserApi = require('../features/user/dataSources/userApi');
const UserDb = require('../features/user/dataSources/userDb');
const ConferenceDb = require('../features/conference/conferenceDb');
const DictionariesDb = require('../features/dictionaries/dictionariesDb');

const ds = {
    userApi: new UserApi(),
    userDb: new UserDb(),
    conferenceDb: new ConferenceDb(),
    dictionariesDb: new DictionariesDb()
}

module.exports.getDataSources = () => (ds)

// This is a temporary fix to pass dataSources to ws requests. This will be fixed in Apollo server v3.0
module.exports.initializedDataSources = (context, dbInstance) => {
    ds.userApi.initialize({ context })
    ds.userDb.initialize({ context: { dbInstance } })
    ds.conferenceDb.initialize({ context: { dbInstance } })
    ds.dictionariesDb.initialize({ context: { dbInstance } })
    return ds
}