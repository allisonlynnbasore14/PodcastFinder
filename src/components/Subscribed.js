
import React from 'react'
import PropTypes from 'prop-types'

const Subscribed = ({vals, onClick}) => (
<div>

	<div className="asideB">
	  Subscribed
	</div>
	 <ul className='listBox'>
	    {vals.map((val, i) =>
	    	<li key={i}>{<button className="Button" onClick={e => onClick(val)} type="button">{ val.title}</button>}</li>
	    	
	    )}
	</ul>
  </div>
)

Subscribed.propTypes = {
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Subscribed