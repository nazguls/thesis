import React, {Component} from 'react';
import { AppRegistry, View } from 'react-native';

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
		console.log(this.props.stockRes.data);
		return (
			<View>
		  	<Header headerText={this.props.stockRes.data} />
		  	<Price Price={this.props.stockRes.data} />
		  	<Chart Chart={stockObj.chart} />
		  	<Periodic />
		  	<BuySell />
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
