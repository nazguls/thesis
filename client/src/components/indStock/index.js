import React, {Component} from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './header';
import Price from './Price';

const stockObj = {
  name: 'AAPL',
  description: 'Apple Inc. - Common Stock',
  price: '$135.21',
  chart: 'https://i.stack.imgur.com/KRxDx.png'
}

class Index extends Component {
	render(){
		return (
		  <View>
		    <Header headerText = { stockObj }/>
		    <Price Price = { stockObj.price } Chart = { stockObj.chart }/>
		    <Chart />
		    <Periodic />
		  </View>
	  )
	}
}

export default Index;
