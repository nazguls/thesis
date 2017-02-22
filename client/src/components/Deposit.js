import React, { Component } from 'react';
import { Button, Card, CardSection, Input, Header } from '../actions';
import axios from 'axios';

class Deposit extends Component {
	constructor() {
		super();

		this.state = {
			DepositInput: 0
		};
	}

	UserDeposit(text) {
		this.setState({DepositInput: text});
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
				<Header>
					Transfer to RobinHood
				</Header>

				<CardSection>
					<Input
						label="Shares"
						placeholder="0"
						onChangeText={this.UserDeposit.bind(this)}
						value={this.props.stockShare}
					/>
				</CardSection>

				<CardSection>
					<Button onPress={this.buttonPressed.bind(this)}>
						Deposit
					</Button>
				</CardSection>
			</Card>
		)
	}
}

export default Deposit;