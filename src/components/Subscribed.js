
import React from 'react'
import PropTypes from 'prop-types'

const Subscribed = ({vals, onClick}) => (
<div>

	<div className="asideB">
	  Subscribed
	</div>
	 <ul className='listBox'>
	    {vals.map((val, i) =>
	    	<li key={i}>{<button className="Button" onClick={e => onClick(e.target.value)} value={val} type="button">{val}</button>}</li>
	    	
	    )}
	</ul>
  </div>
)

Subscribed.propTypes = {
  options: PropTypes.array.isRequired,
  onChance: PropTypes.func.isRequired
}

export default Subscribed