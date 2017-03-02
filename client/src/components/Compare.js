import React, { Component } from 'react';
import { Button, Background, CardSection, Input } from './common';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';

class Compare extends Component {

	render() {
		return (
			<Background>
				<View style={styles.viewStyle}>
					<View style={styles.columnStyle}>
						<Text style={styles.textStyle}> YOU </Text>
						<Text style={styles.textStyle}> VS </Text>
						<Text style={styles.textStyle}> S&P </Text>
					</View>
				</View>
			</Background>
		);
	}
}

const styles = {
	viewStyle: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 20,
		marginRight: 20,
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
		backgroundColor: 'transparent',
		fontSize: 20,
		color: '#42f4c2'
	}
};

export default Compare;