import React, {Component} from 'react';
import { AppRegistry, View, Text, ScrollView } from 'react-native';
import { Background } from '../common';
import { connect } from 'react-redux';

import Header from './header';
import Price from './price';
//import Chart from './chart';
import Chart from './chart.js';
import BuySell from './buySell';
import Periodic from './periodic';

const SideMenu = require('react-native-side-menu');


class Index extends Component {
	constructor () {
		super();
	}

	render() {
		const { stockRes } = this.props;
		const { viewStyle, textStyle, columnStyle} = styles;

		return (
			<ScrollView>
				<Background>
					<Header />
					<Price />

					<Chart />
					<BuySell />
					<Text style = {{ backgroundColor: 'transparent', marginLeft: 10, marginTop: 10, fontSize: 20, borderBottomWidth: 3, color: '#42f4c2' }}> Stats </Text>

					<View style={viewStyle}>
						<View style={columnStyle}>
							<Text style={textStyle}> OPEN </Text>
							<Text style={textStyle}> {stockRes.data.Open} </Text>
						</View>
						<View style={columnStyle}>
							<Text style={textStyle}> HIGH </Text>
							<Text style={textStyle}> {stockRes.data.High} </Text>
						</View>
					</View>

					<View style={viewStyle}>
						<View style={columnStyle}>
							<Text style={textStyle}> LOW </Text>
							<Text style={textStyle}> {stockRes.data.Low} </Text>
						</View>
						<View style={columnStyle}>
							<Text style={textStyle}> CHANGE </Text>
							<Text style={textStyle}> {Math.round((stockRes.data.Change * 100) / 100) + '%'} </Text>
						</View>
					</View>

					<View style={viewStyle}>
						<View style={columnStyle}>
							<Text style={textStyle}> CHANGE YTD </Text>
							<Text style={textStyle}> {stockRes.data.ChangeYTD} </Text>
						</View>
						<View style={columnStyle}>
							<Text style={textStyle}> MKT CAP </Text>
							<Text style={textStyle}> {Math.round(stockRes.data.MarketCap / 1000000000)} Bil </Text>
						</View>
					</View>

					<View style={viewStyle}>
						<View style={columnStyle}>
							<Text style={textStyle}> VOL </Text>
							<Text style={textStyle}> {stockRes.data.Volume} </Text>
						</View>
						<View style={columnStyle}>
							<Text>  </Text>
							<Text> </Text>
						</View>
					</View>
				</Background>
			</ScrollView>


	  );
	}
}
const styles = {


	viewStyle: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'transparent',
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
		borderColor: 'grey'
	},
	textStyle: {
		color: '#42f4c2'
	}
};

const mapStateToProps = ({ search }) => {
	const { stockRes } = search;
	return {
		stockRes
	};
};

export default connect(mapStateToProps, {})(Index);



