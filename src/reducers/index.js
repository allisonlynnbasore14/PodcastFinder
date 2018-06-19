
import { combineReducers } from 'redux'
import {
  SELECT_QUERY, INVALIDATE_QUERY,
  REQUEST_PODCASTS, RECEIVE_PODCASTS,
  SELECT_SEARCH_TYPE, SELECT_INDI,
  RECEIVE_INDI, CHANGE_INDI_SHOW,
  REQUEST_INDI, TOGGLE_INDI,
  SUBSCRIBE, ADDINITALSUBSCRIBED
} from '../actions'

const selectedQuery = (state = null, action) => {
  switch (action.type) {
    case SELECT_QUERY:
      return action.query
    default:
      return state
  }
}

const subscribed = (state=[],action)=>{
  switch (action.type){
    case SUBSCRIBE:
      return [...action.subscribed, action.subscribedPod]
    case ADDINITALSUBSCRIBED:
      return action.initalSubscribed
    default:
      return state
  }
}


const podcastsByQuery = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_QUERY:
    case RECEIVE_PODCASTS:
    case REQUEST_PODCASTS:;
      return {
        ...state,
        [action.query]: podcasts(state[action.query], action)
      }
    default:
      return state
  }
}


const indiPod = (state = null, action) => {
  switch (action.type) {
    case TOGGLE_INDI:
      return null
    case SELECT_INDI:
      return action.indiPod
    case RECEIVE_INDI:
      return{
        ...state,
        showIndi: true,
        podcast: action.indiPod
      }
    case REQUEST_INDI:
      return {
        ...state,
        [action.indiPod]: indiPodcast (state[action.indiPod], action)
      }
    default:
      return state
  }
}


const searchType = (state = 'title', action) => {
  switch (action.type) {
    case SELECT_SEARCH_TYPE:
      return action.searchType
    default:
      return state
  }
}

const indiPodcast = (state = {
  showIndi: false,
  indiPod: []
  },action) =>{
  switch(action.type){
    case RECEIVE_INDI:
      return{
        ...state,
        showIndi: true,
        indiPod: action.url
      }
    case CHANGE_INDI_SHOW:
      return{
        ...state,
        showIndi: true,
        indiPod: null
      }
    case SELECT_INDI:
      return{
        showIndi: true,
        indiPod: action.indiPod

      }
    case TOGGLE_INDI:
      return{
        indiPod: null,
        showIndi: false
      }
    default:
      return state
  }
}

const podcasts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_QUERY:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_PODCASTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PODCASTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: sortVals(action.podcasts,action.searchType),
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

function sortVals (podcasts, searchType){

  if(searchType==null){
    return podcasts
  }


  if(searchType=='popularity'){
    for(var a = podcasts.length-1; a>=0;a--){
      for(var b = 1;b<=a;b++){
        if(podcasts[b].subscribers > podcasts[b-1].subscribers){
          var temp = podcasts[b]
          podcasts[b] = podcasts[b-1]
          podcasts[b-1] = temp
        }
      }
    }
  }

  if(searchType=='title'){
    for(var a = podcasts.length-1; a>=0;a--){
      for(var b = 1;b<=a;b++){
        if(podcasts[b].title < podcasts[b-1].title){
          var temp = podcasts[b]
          podcasts[b] = podcasts[b-1]
          podcasts[b-1] = temp
        }
      }
    }
  }

  if(searchType=='recommended'){
    for(var a = podcasts.length-1; a>=0;a--){
      for(var b = 1;b<=a;b++){
        if(podcasts[b].subscribers - podcasts[b].subscriber_last_week> podcasts[b-1].subscribers - podcasts[b-1].subscribers_last_week){
          var temp = podcasts[b]
          podcasts[b] = podcasts[b-1]
          podcasts[b-1] = temp
        }
      }
    }
  }
  




  return podcasts
}

const rootReducer = combineReducers({
  podcastsByQuery,
  selectedQuery,
  searchType,
  indiPod,
  subscribed
})

export default rootReducer
