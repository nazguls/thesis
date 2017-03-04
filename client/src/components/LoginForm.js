import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Input, Button, Spinner, Background } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {

	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		//action creator
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;

		this.props.loginUser({ email, password });
	}
	
	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}
		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Login
			</Button>
		);
	}
	renderSignUpButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}
		return (
			<Button onPress={() => Actions.signup()}>
				Sign Up
			</Button>
		);
	}


	render() {
		console.log(this.props);
		return (
			<Background>
				<Text style={style.limeShape}> 3<Text style={style.limeTitle}> limeRock </Text>
				</Text>
				<CardSection>
					<Input
						label="Email"
						placeholder="email@gmail.com"
						onChangeText={this.onEmailChange.bind(this)}
						//this value was given this.props.email
						value={this.props.email}
					/>
				</CardSection>

				<CardSection>
					<Input
						//prop to say text in there display as props
						label="Password"
						secureTextEntry
						placeholder="password"
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/>
				</CardSection>

				<Text style={style.errorTextStyle}>
					{this.props.error}
				</Text>

				<CardSection>
					{this.renderButton()}
				</CardSection>
				<CardSection>
					{this.renderSignUpButton()}
				</CardSection>
			</Background>

		);
	}
}

const style = {
	limeShape: {
		fontSize: 200,
		color: 'transparent',
		borderWidth: 2,
		borderColor: '#42f4c2',
		borderRadius: 80,
		backgroundColor: 'transparent',
		marginBottom: 50
	},
	limeTitle: {
		fontWeight: '100',
		fontSize: 40,
		backgroundColor: 'transparent',
		color: '#42f4c2',
		marginBottom: 30
	},
	background: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: null,
		height: null
	},
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading } = auth;
	return {
		email,
		password,
		error,
		loading
	};
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
