
import React from 'react'
import PropTypes from 'prop-types'
import ReactImageFallback from "react-image-fallback";


const IndiBox = ({podcast, onClick1, onClick2}) => (
	<div className='IndiBox'>
		{podcast.title}
		<button className="Button" onClick={e => onClick1(e.target.value)} value={"finally"} type="button">
			<i class="fa fa-times" aria-hidden="true"></i>
		</button>

		<div className="Image">
            <ReactImageFallback
                src={podcast.logo_url}
                fallbackImage="https://i0.wp.com/jordanbpeterson.com/wp-content/uploads/2016/12/Podcast-Icon-v3.png?resize=229%2C300&ssl=1"
                initialImage={podcast.logo_url}
                alt="Podcast Image"
                className="Podcast_Image"
            />
		</div>
		<div className="Text">
			{podcast.description}
		</div>
		<div className="Subscribers">
			Subscribers: {podcast.subscribers}
			<div className="ListenLink">
				<a href={podcast.website}>Listen Now!</a>
				
			</div>
			<button className="SubscribeButton" onClick={e => onClick2(podcast)} value={podcast} type="button">
				Subscribe
			</button>
		</div>
  	</div>

)

IndiBox.propTypes = {
  onClick1: PropTypes.func.isRequired,
  onClick2: PropTypes.func.isRequired
}

export default IndiBox