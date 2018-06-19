import { Form, Text, TextArea, Radio, RadioGroup, Select, Checkbox } from 'react-form';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectQuery, fetchPodcastsIfNeeded, invalidateQuery, makeQuery, changeSearchType, loadSubscribed, changeIndiShow, subscribe, selectIndiPodcast, indiPod, toggleIndi} from '../actions'
import Picker from '../components/Picker'
import Podcasts from '../components/Podcasts'
import TopPodcast from '../components/TopPodcast'
import GenreBox from '../components/GenreBox'
import Subscribed from '../components/Subscribed'
import IndiBox from '../components/IndiBox'
require('../stylesheets/main.css')

class App extends Component {
  static propTypes = {
    selectedQuery: PropTypes.string.isRequired,
    podcasts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    searchType: PropTypes.string.isRequired,
    showIndi: PropTypes.bool.isRequired,
    indiPod: PropTypes.object.isRequired,
    subscribed: PropTypes.array.isRequired
  }

  componentDidMount() {

    const { dispatch, selectedQuery, searchType,indiPod,showIndi } = this.props
    dispatch(fetchPodcastsIfNeeded(selectedQuery, searchType))
    dispatch(loadSubscribed())
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedQuery !== this.props.selectedQuery) {
      const { dispatch, selectedQuery, searchType , indiPod,showIndi} = nextProps
      dispatch(fetchPodcastsIfNeeded(selectedQuery,searchType))
    }
  }


  handleSearchType = nextType => {

    this.props.dispatch(changeSearchType(nextType))
    const { dispatch, selectedQuery , searchType} = this.props
    dispatch(fetchPodcastsIfNeeded(selectedQuery, searchType))

  }

  openPodcast = podToOpen=>{
    this.props.dispatch(indiPod(podToOpen)) 
    this.props.dispatch(selectIndiPodcast(podToOpen))
  }

  subscribe = podcast=>{
    this.props.dispatch(subscribe(podcast, this.props.subscribed))
    
  }

  toggleIndi = podToClose=>{
    this.props.dispatch(toggleIndi())
  }

  handleChange = nextQuery => {

    this.props.dispatch(selectQuery(nextQuery))
  }

  processSearch(event){
    event.preventDefault();
    const data = new FormData(event.target);

  }

  handleGenre = option => {
    this.props.dispatch(selectQuery(option))
  }

  handleSearch(val){
    this.props.dispatch(selectQuery(val.submittedValues.search))
  }


  handleRefreshClick = e => {
    e.preventDefault()
  
    const { dispatch, selectedQuery , searchType} = this.props
    dispatch(fetchPodcastsIfNeeded(selectedQuery, searchType))
  }

  render() {
    const { selectedQuery, podcasts, isFetching, lastUpdated, searchType, showIndi, indiPod, subscribed} = this.props
    const isEmpty = podcasts.length === 0
    console.log("ppppppppppppppp");
    console.log(this.props)
    return (
      <div>
          {this.props.indiPod &&
            <IndiBox podcast={indiPod} onClick1={this.toggleIndi} onClick2={this.subscribe}/>
          }
        <div className = "main-layout">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous"> 
          </link>
          <div className="search">
              <Form onSubmit={submittedValues => this.handleSearch({ submittedValues })}>
              {formApi => (
                <form className = "searchBox" onSubmit={formApi.submitForm} id="form2">
                <Text field="search" id="search" placeholder=" Search.." />
                  <button onClick={submittedValues => this.setState({ submittedValues })} type="submit"><i class="fa fa-search"></i></button>
                </form>
              )}
              </Form>
              <Picker value={searchType}
                onChange={this.handleSearchType}
                options={[ 'title', 'popularity' , 'recommended']} className= "pickerBox" />
          </div>
          <div className="genreBox">
            <GenreBox value={selectedQuery} onClick={this.handleGenre} options={[ 'History', 'Business','Comedy','News','Technology','Education','Health','Games','Film','Politics','Sport','Science', 'Arts','Religion']}/>
          </div>
          <div className="subscribed">
            <Subscribed value={selectedQuery} onClick={this.openPodcast} vals={subscribed}/>
          </div>
          <div className="TopPodcast_Box" >
                {podcasts.map((podcast, i) =>
                  <p key={i}>{<TopPodcast onClick={this.openPodcast} podcast={podcast} value={podcast}
                  />}
                  </p>
                )}
            
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => {
  const { selectedQuery, podcastsByQuery , searchType, indiPod, subscribed} = state
  const {
    isFetching,
    showIndi,
    lastUpdated,
    items: podcasts
  } = podcastsByQuery[selectedQuery] || {
    isFetching: true,
    items: []
    //title
  }

  return {
    selectedQuery,
    podcasts,
    isFetching,
    lastUpdated,
    searchType,
    showIndi,
    indiPod,
    subscribed
  }
}

export default connect(mapStateToProps)(App)
