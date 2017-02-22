import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../common/';
import { updateStockShare } from '../../actions';
import axios from 'axios';

class Buy extends Component {


	onSharesChange(text) {
		console.log('from onSharesChange', text)
		this.props.updateStockShare(text);
	}



	onButtonPress() {
		console.log('stockShare', this.props.stockShare);
		console.log('stockPrice', this.props.stockRes.data.LastPrice)
		console.log('stockTicker', this.props.stockRes.data.Symbol)

		axios({
			method: 'post',
			url: 'http://localhost:3000/api/stocks/' + 'nflx',
			data: {
				// stock: this.props.stockRes.data.Symbol,
				transact: 'buy',
				userId: 1,
				price: 13,
				shares: 3
			}
		}).then(function(response) {
			console.log(response);
		}).catch(function(error) {
			console.log(error)
		});
	}

	render() {

		console.log('from buy' , this.props);
		const { viewStyle, textStyle } = styles;
		const {stockRes, stockShare} = this.props;
		return (
			<Card>
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
					/>
					<Text>{stockRes.data.LastPrice}</Text>
				</CardSection>

				<CardSection>
					<Input
						label="EST Cost"
						placeholder="500"
					/>
					<Text>{stockRes.data.LastPrice * stockShare}</Text>
				</CardSection>

				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Confirm
					</Button>
				</CardSection>
			</Card>
	  );
	}
}

const styles = {
	viewStyle: {
		marginTop: 20,
		marginBottom: 10,
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		fontSize: 20
	}
};

const mapStateToProps = (state) => {
	const { stockRes, stockShare } = state.search;
	console.log(stockRes);
	console.log('stockshare' , stockShare);
	return ({
		stockShare,
		stockRes
	});
};


export default connect(mapStateToProps, { updateStockShare })(Buy);
