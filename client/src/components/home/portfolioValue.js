import React, { Component } from 'react';
import { Text } from 'react-native';

class PortfolioValue extends Component {
	render() {
		const { textStyle } = styles;
		return (
			<Text style={styles.textStyle}> 3200.70 </Text>
		);
	}
}
const styles = {

	textStyle: {
		marginTop: 30,
		backgroundColor: 'transparent',
		color: '#42f4c2',
		fontSize: 40,
		fontWeight: '100'
	}
};

export default PortfolioValue;