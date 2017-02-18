import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Holdings extends Component {
	render(){
		const { viewStyle, textStyle } = styles;
		return (
			<View style = {styles.viewStyle} onPress={()=>Actions.indStock()}>
				<Text> AAPL </Text>
				<Text> .25% </Text>
			</View>
		)
	}
}

const styles = {
	viewStyle: {
		// marginBottom: 10,
		paddingTop: 20,
		paddingBottom: 20,
		paddingRight: 10,
		paddingLeft: 10,
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		borderWidth: 1,
		alignSelf: 'stretch',
		backgroundColor: '#F8F8F8',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 5,
		position: 'relative'
	},
	textStyle: {
		fontSize: 20
	}

};


export default Holdings;