import { emptyString, emptyArray, emptyObject } from 'utils/constants';
import { remove } from 'ramda';

export const initialConference = {
    id: 0,
    name: emptyString,
    startDate: null,
    endDate: null,
    location: emptyObject,
    speakers: emptyArray,
    type: null,
    category: null,
    deletedSpeakers: emptyArray
}

export const reducer = (state, action) => {
    const minSpeakerId = Math.min(...state.speakers.map(speaker => speaker.id), 0)
    switch (action.type) {
        case 'resetData':
            return { deletedSpeakers: emptyArray, ...action.payload }
        case 'addSpeaker':
            return { ...state, speakers: [...state.speakers, { id: minSpeakerId - 1 }] }
        case 'name':
        case 'startDate':
        case 'endDate':
        case 'type':
        case 'category':
            return { ...state, [action.type]: action.payload }
        case 'locationName':
            return { ...state, location: { ...state.location, name: action.payload } }
        case 'address':
        case 'country':
        case 'county':
        case 'city':
        case 'latitude':
        case 'longitude':
            return { ...state, location: { ...state.location, [action.type]: action.payload } }
        case 'speakerName':
            return {
                ...state,
                speakers: [
                    ...state.speakers.slice(0, action.index),
                    { ...state.speakers[action.index], name: action.payload },
                    ...state.speakers.slice(action.index + 1)
                ]
            }
        case 'nationality':
        case 'rating':
        case 'isMainSpeaker':
            return {
                ...state,
                speakers: [
                    ...state.speakers.slice(0, action.index),
                    { ...state.speakers[action.index], [action.type]: action.payload },
                    ...state.speakers.slice(action.index + 1)
                ]
            }
        case 'deleteSpeaker':
            return {
                ...state,
                speakers: remove(action.index, 1, state.speakers),
                deletedSpeakers: state.speakers[action.index].id > 0
                    ? [...state.deletedSpeakers, state.speakers[action.index].id]
                    : state.deletedSpeakers
            }
        default:
            return state
    }
}