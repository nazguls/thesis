import React, { Component } from 'react';
import { Text, View, TouchableHighlight, ScrollView, Image } from 'react-native';
import { CardSection } from '../common';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { searchStock, updateMarketValue } from '../../actions';
import { connect } from 'react-redux';

class Holdings extends Component {

	constructor(props) {
		super(props);

		this.state = {
			portfolio: null,
			indStockButtonView: ''
		};
	}

	componentWillMount() {
		const context = this;
		axios.get('http://127.0.0.1:3000/api/portfolio/isaac1?period=current')
		.then(response => {
			context.setState({
				portfolio: response,
				indStockButtonView: ' "$" + stock.currentPrice'
			});


			let total = 0;
			for (let i = 0; i < response.data.length; i++) {
				total += response.data[i].marketValue;
			}

			context.props.updateMarketValue(total);
		}).catch(error => {
			console.log(error);
		});
	}

	onButtonPress(text) {
		const searchQuery = text.symbol;
		this.props.searchStock({ search: searchQuery });
	}

	indStockButtonPress() {
		if (this.state.indStockButtonView === ' "$" + stock.currentPrice') {
			this.setState({ indStockButtonView: 'stock.numOfShares + " shares"' });
		} else {
			this.setState({ indStockButtonView: ' "$" + stock.currentPrice' });
		}
	}

	render() {
		if (this.state.portfolio === null) {
			return (
				<View>
					<Image source={{ uri: 'http://i.giphy.com/13vjYK5TC5wELK.gif' }} style={{ width: 50, height: 50 }} />
				</View>
			);
		}
		const { data } = this.state.portfolio;
		const { viewStyle, container, textStyle, buttonStyle } = styles;
		const stockData = data.map((stock, key) => {
			return (
				<TouchableHighlight key={key} onPress={this.onButtonPress.bind(this, stock)}>
					<View style={viewStyle} >
					<Text style={textStyle}> {stock.symbol} </Text>
					<Text style={buttonStyle} onPress={this.indStockButtonPress.bind(this)}>  { eval(this.state.indStockButtonView) } </Text>
					</View>
				</TouchableHighlight>
			)}
		);

		return (
			<View style={container} >
				<ScrollView>
					{stockData}
				</ScrollView>
			</View>
		);
	}
}

const styles = {
	viewStyle: {
		paddingTop: 20,
		paddingBottom: 20,
		// backgroundColor: 'transparent',
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		borderColor: '#ddd',
    borderBottomWidth: 1,
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative'
	},
	container:{
		flex: 1,
		alignSelf: 'stretch'
	},
	textStyle: {
		fontSize: 17,
		color: '#42f4c2'
		// color: 'transparent'

	},
	buttonStyle: {
		borderWidth: 1,
		// backgroundColor: '#42f4c2',
 		padding: 5,
		fontSize: 17,
		color: '#42f4c2',
		borderRadius: 10,
    borderColor: '#42f4c2'
	}
};

export default connect(null, { searchStock, updateMarketValue })(Holdings);
