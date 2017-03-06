import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Button, Background, CardSection, Input } from './common';
import { updateCashValue } from '../actions';

class Deposit extends Component {
	constructor() {
		super();
    this.state = {
			DepositInput: 0
		};
	}

	UserDeposit(text) {
		this.setState({ DepositInput: text });
	}

	buttonPressed() {
		const context = this;
		const email = this.props.email;
		const depositInput = parseInt(this.state.DepositInput);
		axios({
			method: 'post',
			url: `http://127.0.0.1:3000/api/money/${email}`,
			data: {
				amount: depositInput,
				type: 'DEPOSIT',
			}
		})
		.then(response => {
			const cashValue = parseInt(context.props.cashValue);
      const newCashValue = cashValue + depositInput;
			context.props.updateCashValue(newCashValue);
			console.log(response);
			Actions.pop();
		})
		.catch(error => console.log(error));
	}

	render() {
		return (
			<Background>
				<CardSection>
					<Input
						label="Amount"
						placeholder="0"
						onChangeText={this.UserDeposit.bind(this)}
					/>
				</CardSection>

				<CardSection>
					<Button onPress={this.buttonPressed.bind(this)}>
						Deposit
					</Button>
				</CardSection>
				</Background>
		);
	}
}

const mapStateToProps = (state) => {
	const { email } = state.auth;
	const { cashValue } = state.user;
	return ({
		email,
		cashValue
	});
};
export default connect(mapStateToProps, { updateCashValue })(Deposit);
