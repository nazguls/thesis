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
		const { stockRes } = this.props;
		const { viewStyle, textStyle, columnStyle} = styles;

		return (
			<ScrollView>
				<View>
					<Header headerText />
					<Price Price />
					<Chart Chart={stockObj.chart} />
					<Periodic />
					<BuySell />
					<Text style = {{ marginLeft: 10, marginTop: 10, fontSize: 20, borderBottomWidth: 3 }}> Stats </Text>

					<View style={viewStyle}>
						<View style={columnStyle}>
							<Text> OPEN </Text>
							<Text> {stockRes.data.Open} </Text>
						</View>
						<View style={columnStyle}>
							<Text> HIGH </Text>
							<Text> {stockRes.data.High} </Text>
						</View>
					</View>

					<View style={viewStyle}>
						<View style={columnStyle}>
							<Text> LOW </Text>
							<Text> {stockRes.data.Low} </Text>
						</View>
						<View style={columnStyle}>
							<Text> CHANGE </Text>
							<Text> {Math.round((stockRes.data.Change * 100) / 100) + '%'} </Text>
						</View>
					</View>

					<View style={viewStyle}>
						<View style={columnStyle}>
							<Text> CHANGE YTD </Text>
							<Text> {stockRes.data.ChangeYTD} </Text>
						</View>
						<View style={columnStyle}>
							<Text> MKT CAP </Text>
							<Text> {Math.round(stockRes.data.MarketCap / 1000000000)} Bil </Text>
						</View>
					</View>

					<View style={viewStyle}>
						<View style={columnStyle}>
							<Text> VOL </Text>
							<Text> {stockRes.data.Volume} </Text>
						</View>
						<View style={columnStyle}>
							<Text>  </Text>
							<Text> </Text>
						</View>
					</View>
				</View>
			</ScrollView>


	  );
	}
}
const styles = {


	viewStyle: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight:10,
		justifyContent: 'space-between',
		flexDirection: 'row',
		position: 'relative',
		alignItems: 'center',
	},
	columnStyle: {
		marginLeft: 5,
		marginRight: 5,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		justifyContent: 'space-between',
		flex: 1,
		borderColor: '#ddd'
	},
	textStyle: {
		fontSize: 12
	}
};

const mapStateToProps = ({ search }) => {
	const { stockRes } = search;
	return {
		stockRes
	};
};

export default connect(mapStateToProps, {})(Index);



