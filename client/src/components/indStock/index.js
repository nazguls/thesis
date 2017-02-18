import React, {Component} from 'react';
import { AppRegistry, View } from 'react-native';

import Header from './header';
import Price from './price';
import Chart from './chart';
import BuySell from './buySell';
import Periodic from './periodic'

const SideMenu = require('react-native-side-menu');

const stockObj = {
  name: 'AAPL',
  description: 'Apple Inc. - Common Stock',
  price: '$135.21',
  chart: 'https://i.stack.imgur.com/KRxDx.png'
}

class Index extends Component {
	constructor () {
		super();
	}

	render(){
		return (
		  <View>
		    <Header headerText = { stockObj }/>
		    <Price Price = { stockObj.price } />
		    <Chart Chart = { stockObj.chart}/>
		    <Periodic />
		    <BuySell />

		  </View>
	  )
	}
}

export default Index;
