
import React from 'react'
import PropTypes from 'prop-types'

const Podcasts = ({podcasts}) => (
  <ul>
    {podcasts.map((podcast, i) =>
      <li key={i}>{podcast.title}</li>
    )}
  </ul>
)

Podcasts.propTypes = {
  podcasts: PropTypes.array.isRequired
}

export default Podcasts

