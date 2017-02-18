import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from 'react-native-vector-icons/Foundation'

class Nav extends Component {
	render(){
		const { viewStyle } = styles;
		return (
			<View style= {styles.viewStyle}>
			 <Icon name='person-outline' size={40} />
			 <Search name='magnifying-glass' size= {40} />
			</View>
		)
	}
}
const styles = {
	viewStyle: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
}
export default Nav;