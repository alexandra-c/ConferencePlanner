const { SQLDataSource } = require("../../utils/sqlDataSource");

class DictionariesDb extends SQLDataSource {

  async getCategoryList() {
    const data = await this.knex
      .select(
        "Id",
        "Name",
        "Code"
      )
      .from("DictionaryCategory")
    return data;
  }

  async getTypeList() {
    const data = await this.knex
      .select(
        "Id",
        "Name",
        "Code"
      )
      .from("DictionaryConferenceType")
    return data;
  }

  async getCountryList() {
    const data = await this.knex
      .select(
        "Id",
        "Name",
        "Code"
      )
      .from("DictionaryCountry")
    return data;
  }

  async getCountyList() {
    const data = await this.knex
      .select(
        "Id",
        "Name",
        "Code"
      )
      .from("DictionaryCounty")
    return data;
  }

  async getCityList() {
    const data = await this.knex
      .select(
        "Id",
        "Name",
        "Code"
      )
      .from("DictionaryCity")
    return data;
  }
}

module.exports = DictionariesDb;