import { gql } from "@apollo/client";
import CommonFragments from "features/common/fragments";
import Fragments from "../fragments";

export const CONFERENCE_QUERY_LIST = gql`
    query conferenceList($pager: PagerInput!, $filters: ConferenceFilterInput) {
        conferenceList(pager: $pager, filters: $filters) {
            values {
                ...conferenceItem
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
${Fragments.conferenceItem}
`