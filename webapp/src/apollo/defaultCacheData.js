import { emailKey } from "./cacheKeyFunctions"
//import { emptyString } from "utils/constants"

// Here you define the default values for local apollo state (@client only values)
// https://www.apollographql.com/docs/react/local-state/local-state-management/

const emailValue = { email: "admin@totalsoft.ro" } // this should be empty in live

export const defaults = {
    [emailKey]: emailValue
}