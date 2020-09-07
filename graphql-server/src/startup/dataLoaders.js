
const { getUserDataLoaders } = require("../features/user/dataLoaders");
const { getConferenceLoaders } = require("../features/conference/dataLoaders");
const { getDictionaryLoaders } = require("../features/dictionaries/dataLoaders");

module.exports = dbInstance => ({
  ...getUserDataLoaders(dbInstance),
  ...getConferenceLoaders(dbInstance),
  ...getDictionaryLoaders(dbInstance)
});
