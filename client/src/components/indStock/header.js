import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
	const { textStyle, viewStyle } = styles;
		return (
			<View style={viewStyle}>
				<Text style={textStyle}>{props.headerText.name}</Text>
				<Text> {props.headerText.description} </Text>
			</View>
		);
};

const styles = {
	viewStyle: {
		marginTop: 20,
		// marginBottom: 10,
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		fontSize: 20
	}

};

export default Header;