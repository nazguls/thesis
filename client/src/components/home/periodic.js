import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Periodic extends Component {
	render() {
		const {textStyle} = styles;

		return (
			<View style = {styles.viewStyle}>
				<Text style = {styles.textStyle}> 1D </Text>
				<Text style = {styles.textStyle}> 1M </Text>
				<Text style = {styles.textStyle}> 3M </Text>
				<Text style = {styles.textStyle}> 6M </Text>
				<Text style = {styles.textStyle}> 1Y </Text>
				<Text style = {styles.textStyle}> ALL </Text>
			</View>
		)
	}
}

const styles = {
	viewStyle: {
		marginTop: 20,
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	textStyle: {
		fontSize: 12,
		color: 'grey',

	}
}

export default Periodic;