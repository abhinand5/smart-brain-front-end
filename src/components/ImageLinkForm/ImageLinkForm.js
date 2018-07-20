import React from 'react';
import './pattern.css';

const ImageLinkForm = ({onInputChange, onSubmit}) => {
	return(
		<div className='LinkForm'>
			<div>
			<p className='f3 title'>{'This magic brain can detect faces on any image out on the web. Give it a try!'}</p>
			</div>
			<div className='center'>
				<div className='center pattern form pa4 br3 shadow-5'>
					<div className='pattern'></div>
					<input type='text' 
						placeholder='Paste image URL' 
						className='f4 pa2 w-70 center' 
						onChange={onInputChange}
					/>
					<button className="w-30 grow f4 link ph3 pv2 dib" onClick = {onSubmit} >Detect</button>
				</div>	
			</div>
		</div>
	);
}
export default ImageLinkForm;