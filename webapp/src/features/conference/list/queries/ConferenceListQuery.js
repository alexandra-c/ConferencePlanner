import { gql } from "@apollo/client";
import CommonFragments from "features/common/fragments";
import Fragments from "../fragments";

export const CONFERENCE_LIST_QUERY = gql`
    query conferenceList($pager: PagerInput!, $filters: ConferenceFilterInput, $userEmail: String!) {
        conferenceList(pager: $pager, filters: $filters) {
            values {
                ...conference
                location {
                    ...location
                    city {
                        ...city
                    }
                    county{
                        ...county
                    }
                    country{
                        ...country
                    }
                }
                speakers {
                    ...speaker
                }
                status(userEmail: $userEmail){
                    ...status
                }
            }
            pagination(pager: $pager, filters: $filters) {
                totalCount
                prevPage {
                    ...paginationInfo
                }
                nextPage {
                    ...paginationInfo
                }
            }
        }
    }
${CommonFragments.paginationInfo}
${CommonFragments.location}
${CommonFragments.city}
${CommonFragments.county}
${CommonFragments.country}
${Fragments.conference}
${Fragments.speaker}
${Fragments.status}
`