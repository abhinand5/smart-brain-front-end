import React from 'react';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			name: ""
		}
	}
	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}
	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}
	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	onSubmitSignIn = () => {
		fetch('https://mysterious-cove-82235.herokuapp.com/register',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id) {
				this.props.loadUser(user);				
				this.props.onRouteChange('home');
			}
		})
	}

	render() {
		return(
			<div>
				<h1 className="title f1 ma3">Introduce yourself to Smart Brain!</h1>
				<p className="f4 title">It will remember you the next time you're here.</p>
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 title fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 title lh-copy f5" htmlFor="name">Name</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-near-black hover-white w-100" 
							    type="text" 
							    name="name"  
							    id="name"
							    onChange = { this.onNameChange } 
							/>
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy title f5" htmlFor="email-address">Email</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-near-black hover-white w-100" 
					        	type="email" 
					        	name="email-address"  
					        	id="email-address"
					        	onChange = { this.onEmailChange} 
					        />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy title f5" htmlFor="password">Password</label>
					        <input className="b pa2 input-reset ba bg-transparent hover-bg-near-black hover-white w-100" 
					        	type="password" 
					        	name="password"  
					        	id="password"
					        	onChange = { this.onPasswordChange } 
					        />
					      </div>
					    </fieldset>
					    <div className="">
					      <input 
								    className="b ph3 title pv2 input-reset ba b--black bg-transparent grow pointer f5 dib br2" 
									  type="submit" 
									  value="Sign Up"
									  onClick={this.onSubmitSignIn} 
								/>
					    </div>
					  </div>
					</main>
				</article>
			</div>
		);
	}
}
export default Register; 