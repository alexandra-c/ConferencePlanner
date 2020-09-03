import { gql } from "@apollo/client";
import CommonFragments from "features/common/fragments";
import Fragments from "../fragments";

export const PARTICIPANT_QUERY_LIST = gql`
    query participantList($pager: PagerInput!, $filters: ParticipantFilterInput) {
        participantList(pager: $pager, filters: $filters) {
            values {
                ...participantItem
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
${Fragments.participantItem}
`