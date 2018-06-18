

import React from 'react'
//import ReactImageFallback from "react-image-fallback";
import PropTypes from 'prop-types'
require('../stylesheets/main.css')


const TopPodcast = ({podcast, onClick}) => (


		<div >
			<button onClick={e => onClick(podcast)} className="Button_Box" value={podcast}>
			<div className="TopPodcast_Indi_Box">

				<div>
	          //         <div className="Image_Box">
			        //     // <ReactImageFallback
			        //     //     src={podcast.logo_url}
			        //     //     fallbackImage="https://i0.wp.com/jordanbpeterson.com/wp-content/uploads/2016/12/Podcast-Icon-v3.png?resize=229%2C300&ssl=1"
			        //     //     initialImage={podcast.logo_url}
			        //     //     alt="Podcast Image"
			        //     //     className="Podcast_Image"
			        //     // />
			        // </div>
	            </div>
		        <p className="TopPodcast_Main">
					<div>
					</div>
					<br></br>
					<br></br>
					{podcast.title}
					<br></br>
					<br></br>
					{podcast.description}
				</p>
			</div>
			</button>
		</div>
	
)

TopPodcast.propTypes = {
  podcasts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default TopPodcast