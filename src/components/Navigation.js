import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
		if (isSignedIn) {
			return(
				<nav style={{display: 'flex' , justifyContent: 'flex-end', flexWrap: 'nowrap'}}>
					<button onClick={ () => onRouteChange('signout') } className="mr4 mt4 br2 signOut shadow-5"> Sign Out </button>
				</nav>
			);
		} else {
			return(
				<nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
					<button onClick={ () => onRouteChange('signin') } className="mr4 mt4 br2 signOut shadow-5">Sign In</button>
					<button onClick={ () => onRouteChange('register') } className="mr4 mt4 br2 signOut shadow-5">Register</button>
				</nav>
			);
		}
}
export default Navigation;