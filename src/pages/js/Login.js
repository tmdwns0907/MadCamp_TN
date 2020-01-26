import React, { Component } from 'react';
import '../css/Login.css';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			current_state: this.STATE_START,
			signin_button: true,
			revoke_button: true,
			xhr_button: false
		};
	}
	STATE_START = 1;
	STATE_ACQUIRING_AUTHTOKEN = 2;
	STATE_AUTHTOKEN_ACQUIRED = 3;

	//user_info_div = "";

	componentDidMount() {
		// Trying to get user's info without signing in, it will work if the
		// application was previously authorized by the user.
		//this.user_info_div = document.querySelector('#user_info');

		chrome.runtime.sendMessage({ action: 'get-user-info' }, res => {
			//this.changeState(res.state);
			//alert(res.success);
		});
	}

	changeState = newState => {
		switch (newState) {
			case this.STATE_START:
				this.setState({
					current_state: newState,
					signin_button: true,
					//xhr_button: false,
					revoke_button: false
				});
				break;
			case this.STATE_ACQUIRING_AUTHTOKEN:
				//alert('Acquiring token...');
				this.setState({
					current_state: newState,
					signin_button: false,
					//xhr_button: false,
					revoke_button: false
				});
				break;
			case this.STATE_AUTHTOKEN_ACQUIRED:
				this.setState({
					current_state: newState,
					signin_button: false,
					//xhr_button: true,
					revoke_button: true
				});
				//alert(this.state.revoke_button)
				break;
			default:
				break;
		}
	};

	signIn = () => {
		chrome.runtime.sendMessage({ action: 'sign-in' }, res => {
			this.changeState(res.state);
			//alert(res.state);
		});
	};

	signOut = () => {
		chrome.runtime.sendMessage({ action: 'sign-out' }, res => {
			this.changeState(res.state);
			//alert(res.success);
		});
	};

	render() {
		return (
			<div className='flows'>
				<div className='flow'>
					<button id='signin' onClick={this.signIn} disabled={!this.state.signin_button}>
						Sign in
					</button>
					<button id='signout' onClick={this.signOut} disabled={!this.state.revoke_button}>
						Sign Out
					</button>
					{
						//<button id="getxhr" onClick={this.getUserInfo.bind(this, true)} disabled={!this.state.xhr_button}>Get personal data</button>
					}
					<div id='user_info'></div>
				</div>
			</div>
		);
	}
}

export default Login;
