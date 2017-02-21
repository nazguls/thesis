import React, { Component } from 'react';
import { View, Text } from 'react-native';


class Price extends Component {

	constructor (props) {
		super(props);
	}

	render() {
		const { viewStyle, textStyle } = styles;
		return (
			<View style={styles.viewStyle}>
				<Text style={styles.textStyle}>{this.props.Price.LastPrice}</Text>
			</View>
		);
	}
}

const styles = {
	viewStyle: {
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center',
		// height: 60,
		paddingTop: 20,
		position: 'relative'
	},
	textStyle: {
		fontSize: 45
	}
};

export default Price;