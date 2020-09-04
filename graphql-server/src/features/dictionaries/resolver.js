const dictionaryResolvers = {
    Query: {
        categoryList: async (_parent, _params, { dataSources }) => {
            const data = await dataSources.dictionariesDb.getCategoryList();
            return data;
        },
        typeList: async (_parent, _params, { dataSources }) => {
            const data = await dataSources.dictionariesDb.getTypeList();
            return data;
        },
        countryList: async (_parent, _params, { dataSources }) => {
            const data = await dataSources.dictionariesDb.getCountryList();
            return data;
        },
        countyList: async (_parent, _params, { dataSources }) => {
            const data = await dataSources.dictionariesDb.getCountyList();
            return data;
        },
        cityList: async (_parent, _params, { dataSources }) => {
            const data = await dataSources.dictionariesDb.getCityList();
            return data;
        }
    }
};

module.exports = dictionaryResolvers;