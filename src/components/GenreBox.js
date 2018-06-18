
import React from 'react'
import PropTypes from 'prop-types'

const GenreBox = ({options, onClick}) => (
<div>

	<div className="asideA">
	  Genres
	</div>
	 <ul className='listBox'>
	    {options.map((option, i) =>
	    	<li key={i}>{<button className="Button" onClick={e => onClick(e.target.value)} value={option} type="button">{option}</button>}</li>
	    	
	    )}
	</ul>
  </div>
)

GenreBox.propTypes = {
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default GenreBox

//