import { Text } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { Background, CardSection, Input, Button } from '../common/';
import { updateStockShare, updateCashValue } from '../../actions';

class Sell extends Component {
	// constructor() {
	// 	super();

	// 	this.state = {
	// 		currentShare: 0
	// 	};
	// }
	onSharesChange(text) {
		this.props.updateStockShare(text);
	}

	onButtonPress(symbol) {
		if (this.props.stockShare > this.currentShares()) {
			console.log('You dont have enough shares');
		} else {

			const context = this;
			axios({
				method: 'post',
				url: `http://127.0.0.1:3000/api/stocks/${symbol}`,
				data: {
					stock: context.props.stockRes.data.Symbol,
					transact: 'sell',
					userId: 1,
					price: context.props.stockRes.data.LastPrice,
					shares: context.props.stockShare,

				}
			}).then(() => {
				Actions.home({ type: 'reset' });
				const price = context.props.stockRes.data.LastPrice;
				const numShares = context.props.stockShare;
				const preBuyCashValue = context.props.cashValue;
				const newCashValue = preBuyCashValue + (price * numShares);
				const roundedCashValue = Math.round(newCashValue * 100) / 100;
				context.props.updateCashValue(roundedCashValue);
			}).catch(error => console.log(error));
		}
	}

	currentShares() {
		for (let i = 0; i < this.props.numShares.length; i++) {
			if (this.props.numShares[i].symbol === this.props.stockRes.data.Symbol) {
				return JSON.stringify(this.props.numShares[i].numOfShares);
			}
		}
	}
	errorMessage() {
		if (this.props.stockShare > this.currentShares()) {
			return (
				<Text style={{ color: 'red' }}> You are trying to sell more than your current holding </Text>
			);
		}
	}

	render() {
		console.log('num of Shares', this.props.numShares);
		console.log('stockRes', this.props.stockShare);

		const { stockRes, stockShare } = this.props;
		console.log('stockShare', this.props.stockShare);
		return (
			<Background>
				<CardSection>
					<Input
						label="Current Shares"
						placeholder={this.currentShares()}
					/>
				</CardSection>
				<CardSection>
					<Input
						label="Shares"
						placeholder="0"
						onChangeText={this.onSharesChange.bind(this)}
						value={this.props.stockShare}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="MKT Price"
						placeholder={JSON.stringify(stockRes.data.LastPrice)}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="EST Cost"
						placeholder={JSON.stringify(Math.round(stockRes.data.LastPrice * stockShare * 100) / 100)}
					/>
				</CardSection>

				<CardSection>
					<Button onPress={this.onButtonPress.bind(this, this.props.stockRes.data.Symbol)}>
						Confirm
					</Button>
				</CardSection>
				<CardSection>
					{this.errorMessage()}
				</CardSection>
			</Background>

		);
	}
}


const mapStateToProps = (state) => {
	const { stockRes, stockShare } = state.search;
	const { cashValue, numShares } = state.user;
	return ({
		stockShare,
		stockRes,
		cashValue,
		numShares
	});
};

export default connect(mapStateToProps, { updateStockShare, updateCashValue })(Sell);
