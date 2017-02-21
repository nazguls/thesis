import React, { Component } from 'react';
import { Text, View, SideMenu, List, ListItem } from 'react-native';

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
			<View style={styles.viewStyle}>

				<PortfolioValue />
				<Chart Chart={stockObj.chart} />
				<Periodic />
				<Holdings navigator={this.props.navigator} />
			</View>
		);
	}
}


// class IndexMenu extends Component {

// 	constructor () {
//   super()
//   this.state = {
//     isOpen: false
//   }
//   this.toggleSideMenu = this.toggleSideMenu.bind(this)
// }

// toggleSideMenu () {
//   this.setState({
//     isOpen: !this.state.isOpen
//   })
// }

// render () {
//   const MenuComponent = (
//     <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
//       <List containerStyle={{marginBottom: 20}}>
//       {
//         list.map((l, i) => (
//           <ListItem
//             roundAvatar
//             onPress={() => console.log('Pressed')}
//             avatar={l.avatar_url}
//             key={i}
//             title={l.name}
//             subtitle={l.subtitle}
//           />
//         ))
//       }
//       </List>
//     </View>
//   )

//   return (
//     <SideMenu
//       isOpen={this.state.isOpen}
//       menu={MenuComponent}>
//       <App toggleSideMenu={this.toggleSideMenu.bind(this)} />
//     </SideMenu>
//   )
// }


// }



const styles = {
	viewStyle: {
		marginTop: 10,
		// borderWidth: 5,
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