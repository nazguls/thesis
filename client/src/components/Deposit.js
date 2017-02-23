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
		const context = this;
		axios({
			method: 'post',
			url: 'http://localhost:3000/api/money/' + 'mike',
			data: {
				amount: parseInt(context.state.DepositInput),
				type: 'DEPOSIT',
			}
		}).then(function(response) {
			console.log(response);
		}).catch(function(error) {
			console.log(error);
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
