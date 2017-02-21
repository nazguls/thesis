import React, {Component} from 'react';
import { AppRegistry, View, Text } from 'react-native';
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
		const { stockRes } = this.props;
		console.log('from indSTock', stockRes.data);
		return (
			<View>
		  	<Header headerText={stockRes.data} />
		  	<Price Price={stockRes.data} />
		  	<Chart Chart={stockObj.chart} />
		  	<Periodic />
		  	<BuySell />
		  	<CardSection>
		  		<Text> OPEN </Text>
		  		<Text> {stockRes.data.Open} </Text>
				</CardSection>

		  	<CardSection>
		  		<Text> HIGH </Text>
		  		<Text> {stockRes.data.High} </Text>
		  	</CardSection>

		  	<CardSection>
		  		<Text> LOW </Text>
		  		<Text> {stockRes.data.Low} </Text>
		  	</CardSection>

		  	<CardSection>
		  		<Text> CHANGE </Text>
		  		<Text> {stockRes.data.Change} </Text>
		  	</CardSection>

		  	<CardSection>
		  		<Text> CHANGE YTD </Text>
		  		<Text> {stockRes.data.ChangeYTD} </Text>
		  	</CardSection>

		  	<CardSection>
		  		<Text> MKT CAP </Text>
		  		<Text> {stockRes.data.MarketCap} </Text>
		  	</CardSection>

		  	<CardSection>
		  		<Text> VOL </Text>
		  		<Text> {stockRes.data.Volume} </Text>
		  	</CardSection>
		  </View>
	  );
	}
}

const mapStateToProps = ({ search }) => {
	console.log('from indPage', search);
	const { stockRes } = search;
	return {
		stockRes
	};
};

export default connect(mapStateToProps, {})(Index);
