import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
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

	render() {
		console.log('this.props', this.props)
		return (
			<Card>
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
			</Card>
		);
	}
}

const style = {
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