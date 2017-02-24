import React, { Component } from 'react';
import { Text, View, SideMenu, List, ListItem } from 'react-native';
import { Background } from '../common';
////////////////import all the pages/////////////////////////
import Nav from './nav';
import PortfolioValue from './portfolioValue';
import Chart from './chart';
import Periodic from './periodic';
import Holdings from './holdings';
/////////////////////////////////////////////////////////////


const stockObj =
{
  name: 'AAPL',
  description: 'Apple Inc. - Common Stock',
  price: '$135.21',
  chart: 'https://i.stack.imgur.com/KRxDx.png'
};


class Index extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		// const { textStyle, viewStyle } = styles;
		return (
			<Background>
				<PortfolioValue />
				<Chart Chart={stockObj.chart} />
				<Periodic />
				<Holdings navigator={this.props.navigator} />
			</Background>
		);
	}
}



const styles = {
	viewStyle: {
		marginTop: 10,
		alignItems: 'center',
		height: 580,
		paddingTop: 5,
		position: 'relative'
	},
	textStyle: {
		fontSize: 20
	}

};

export default Index;