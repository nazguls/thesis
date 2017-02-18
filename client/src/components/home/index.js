import React from 'react';
import { Text, View, Menu } from 'react-native';

////////////////import all the pages/////////////////////////
import Nav from './nav';
import PortfolioValue from './portfolioValue';
import Chart from './chart';
import Periodic from './periodic';
import Holdings from './holdings';
/////////////////////////////////////////////////////////////
const SideMenu = require('react-native-side-menu');


const stockObj =
{
  name: 'AAPL',
  description: 'Apple Inc. - Common Stock',
  price: '$135.21',
  chart: 'https://i.stack.imgur.com/KRxDx.png'
}


const Index = (props) => {
	const menu = <Menu navigator={navigator}/>;

    return (
      <SideMenu menu={menu}>
        <ContentView/>
      </SideMenu>
    );
  }


class ContentView extends React.Component {
  render() {
	const { textStyle, viewStyle } = styles;
	return (
		<View style={styles.viewStyle}>
			<Nav />
			<PortfolioValue />
			<Chart Chart={stockObj.chart}/>
			<Periodic />
			<Holdings />
		</View>
		);
	}
}

const styles = {
	viewStyle: {
		marginTop: 70,
		borderWidth: 5,
		backgroundColor: '#F8F8F8',
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