import React from 'react';
import '../../App.css';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, boxes }) => {
	return(
		<div className='center'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={imageUrl} width='400px' height='auto'/>
				{ 
					boxes.map( box => {
						return <div key={box.topRow}className='bounding_box' style= {{top: box.topRow , right: box.rightCol , bottom: box.bottomRow ,left: box.leftCol}} ></div>
					})
				}
			</div>
		</div>
	);
}
export default FaceRecognition; 