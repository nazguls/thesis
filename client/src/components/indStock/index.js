import React, {Component} from 'react';
import { AppRegistry, View, Text, ScrollView } from 'react-native';
import { Card, CardSection } from '../common';
import { connect } from 'react-redux';


import Header from './header';
import Price from './price';
import Chart from './chart';
import BuySell from './buySell';
import Periodic from './periodic';

const SideMenu = require('react-native-side-menu');

const stockObj = {
  name: 'AAPL',
  description: 'Apple Inc. - Common Stock',
  price: '$135.21',
  chart: 'https://i.stack.imgur.com/KRxDx.png'
};

class Index extends Component {
	constructor () {
		super();
	}

	render() {
		console.log('from index.js', this.props.stockRes)
		const { stockRes } = this.props;
		console.log('from indSTock', stockRes.data);
		const { viewStyle, textStyle } = styles;

		return (
			<ScrollView>
				<View>
					<Header headerText />
					<Price Price />
					<Chart Chart={stockObj.chart} />
					<Periodic />
					<BuySell />

					<View Style={viewStyle}>
						<CardSection>
							<Text> OPEN </Text>
							<Text> {stockRes.data.Open} </Text>
							<Text> HIGH </Text>
							<Text> {stockRes.data.High} </Text>
						</CardSection>
					</View>

					<CardSection>
						<Text> LOW </Text>
						<Text> {stockRes.data.Low} </Text>
						<Text> CHANGE </Text>
						<Text> {stockRes.data.Change} </Text>
					</CardSection>

					<CardSection>
						<Text> CHANGE YTD </Text>
						<Text> {stockRes.data.ChangeYTD} </Text>
						<Text> MKT CAP </Text>
						<Text> {Math.round(stockRes.data.MarketCap/1000000000)} Bil </Text>
					</CardSection>

					<CardSection>
						<Text> VOL </Text>
						<Text> {stockRes.data.Volume} </Text>
					</CardSection>
					</View>
				</ScrollView>

	  );
	}
}
const styles = {

	viewStyle: {
		alignSelf: 'stretch',
		justifyContent: 'space-between',
		flex: 2,
		borderwidth: 1,
		flexDirection: 'row'
	}
};

const mapStateToProps = ({ search }) => {
	const { stockRes } = search;
	return {
		stockRes
	};
};

export default connect(mapStateToProps, {})(Index);
