
export const REQUEST_PODCASTS = 'REQUEST_PODCASTS'
export const RECEIVE_PODCASTS = 'RECEIVE_PODCASTS'
export const SELECT_QUERY = 'SELECT_QUERY'
export const INVALIDATE_QUERY = 'INVALIDATE_QUERY'
export const SELECT_SEARCH_TYPE = 'SELECT_SEARCH_TYPE'
export const SELECT_INDI = 'SELECT_INDI'
export const RECEIVE_INDI = 'RECEIVE_INDI'
export const CHANGE_INDI_SHOW = 'CHANGE_INDI_SHOW'
export const REQUEST_INDI = 'REQUEST_INDI'
export const TOGGLE_INDI = 'TOGGLE_INDI'

export const selectQuery = query => ({
  type: SELECT_QUERY,
  query
})

export const indiPod = indiPod => ({
  type: SELECT_INDI,
  indiPod
})


export const changeSearchType = searchType => ({
  type: SELECT_SEARCH_TYPE,
  searchType
})

export const changeIndiShow = val =>({
  type: CHANGE_INDI_SHOW,
  val
})

export const invalidateQuery = query => ({
  type: INVALIDATE_QUERY,
  query
})

export const requestPodcasts = (query, searchType) => ({
  type: REQUEST_PODCASTS,
  query,
  searchType
})

export const requestIndi = (indiPod) => ({
  type: REQUEST_INDI,
  indiPod
})

export const toggleIndi = () => ({
  type: TOGGLE_INDI
})

export const makeQuery = query => (dispatch, getState) => {
    return dispatch(fetchPodcasts(query))

}

export const receivePodcasts = (query, searchType, json) => ({
  type: RECEIVE_PODCASTS,
  query,
  podcasts: json.map(child => child),
  receivedAt: Date.now(),
  searchType
})

export const receiveIndiPodcast = (indiPod) => ({
  type: RECEIVE_INDI,
  indiPod
})


export const selectIndiPodcast = (podcast) => dispatch =>{
  dispatch(requestIndi(podcast))
  return fetch(`https://gpodder.net/api/2/data/podcast.json?url=${podcast.url}`)
    .then(response => response.json())
    .then(json => dispatch(receiveIndiPodcast(podcast)))
} 

const fetchPodcasts = (query,searchType) => dispatch => {
  dispatch(requestPodcasts(query,searchType))
  if(query===null){
    return fetch(`https://www.gpodder.net/toplist/50.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePodcasts(query, searchType, json)))
  }else{
    return fetch(`https://www.gpodder.net/api/2/tag/${query.toLowerCase()}/50.json`)
      .then(response => response.json())
  }
}

const shouldFetchPosts = (state, query) => {
    const podcasts = state.podcastsByQuery[query]
  return true;
}

export const fetchPodcastsIfNeeded = (query,searchType )=> (dispatch, getState) => {
  if (shouldFetchPosts(getState(), query)) {
    return dispatch(fetchPodcasts(query,searchType))
  }
}
