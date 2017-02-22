import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';
import axios from 'axios';

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
		console.log(this.state.DepositInput);
		axios.post('/', {
			deposit: this.state.DepositInput
		});
	}

	render() {
		return (
			<Card>
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
			</Card>
		);
	}
}

export default Deposit;
