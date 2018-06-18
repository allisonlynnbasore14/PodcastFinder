
import React from 'react'
import PropTypes from 'prop-types'
//import ReactImageFallback from "react-image-fallback";


const IndiBox = ({podcast, onClick}) => (
	<div className='IndiBox'>
		{podcast.title}
		<button className="Button" onClick={e => onClick(e.target.value)} value={"finally"} type="button">
			<i class="fa fa-times" aria-hidden="true"></i>
		</button>
		<div className="Image">
            // <ReactImageFallback
            //     src={podcast.logo_url}
            //     fallbackImage="https://i0.wp.com/jordanbpeterson.com/wp-content/uploads/2016/12/Podcast-Icon-v3.png?resize=229%2C300&ssl=1"
            //     initialImage={podcast.logo_url}
            //     alt="Podcast Image"
            //     className="Podcast_Image"
            // />
		</div>
		<div className="Text">
			{podcast.description}
		</div>
		<div className="Subscribers">
			Subscribers: {podcast.subscribers}
		</div>
  	</div>
)

IndiBox.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default IndiBox