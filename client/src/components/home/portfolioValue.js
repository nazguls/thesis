import React, { Component } from 'react';
import { Text } from 'react-native';

class PortfolioValue extends Component {
	render() {
		const {textStyle} = styles;
		return (
			<Text style={styles.textStyle}> 3200.70 </Text>
		);
	}
}
const styles = {
	viewStyle: {
		marginTop: 10,
		borderWidth: 2,
		alignItems: 'center',
		paddingTop: 5,
		position: 'relative'
	},
	textStyle: {
		fontSize: 40
	}
};

export default PortfolioValue;