import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { connect } from 'react-redux';
import { CardSection, Input, Button, Background } from '../common/';
import { updateStockShare, updateCashValue, notEnoughFunds } from '../../actions';
import { Text } from 'react-native'

class Buy extends Component {

	onSharesChange(text) {
		this.props.updateStockShare(text);
	}
	onButtonPress(symbol) {

		if (this.props.cashValue < (this.props.stockRes.data.LastPrice * this.props.stockShare)) {
			this.props.notEnoughFunds(true);
		} else {
			const context = this;
		axios({
			method: 'post',
			url: `http://127.0.0.1:3000/api/stocks/${symbol}`,
			data: {
				stock: this.props.stockRes.data.Symbol,
				transact: 'buy',
				email: this.props.email,
				price: this.props.stockRes.data.LastPrice,
				shares: this.props.stockShare,
				}
			}).then(() => {
				Actions.home({ type: 'reset' });
				const price = context.props.stockRes.data.LastPrice;
				const numShares = context.props.stockShare;
				const preBuyCashValue = context.props.cashValue;
				const newCashValue = preBuyCashValue - (price * numShares);
				const roundedCashValue = Math.round(newCashValue * 100) / 100;
				context.props.updateCashValue(roundedCashValue);
			}).catch(error => console.log(error));
		}
	}

	onPurchase() {
		console.log('entered');
		if (this.props.cashValue < (this.props.stockRes.data.LastPrice * this.props.stockShare)) {
			return (<Text style={{ color: 'red' }}> Insufficient Funds </Text>);
		}

	}

	render() {
		const { stockRes, stockShare } = this.props;
		return (
			<Background>

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
						placeholder={JSON.stringify(Math.round((stockRes.data.LastPrice * stockShare) * 100) / 100)}
					/>
				</CardSection>

				<CardSection>
					<Input
						label = "Cash Balance"
						placeholder = {JSON.stringify(this.props.cashValue)}
					/>
				</CardSection>

				<CardSection>
					<Button onPress={this.onButtonPress.bind(this, this.props.stockRes.data.Symbol)}>
						Confirm
					</Button>
				</CardSection>
				<CardSection>
					{this.onPurchase()}
				</CardSection>
			</Background>
		);
	}
}

const mapStateToProps = (state) => {
	const { stockRes, stockShare } = state.search;
	const { email } = state.auth;
	const { cashValue, noCash } = state.user;

	return ({
		email,
		stockShare,
		stockRes,
		cashValue,
		noCash
	});
};

export default connect(mapStateToProps, { updateStockShare, updateCashValue, notEnoughFunds })(Buy);
