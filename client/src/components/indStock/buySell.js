import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

class BuySell extends Component {

	constructor (props) {
		super(props);
		this.navigate = this.navigate.bind(this);
	}

	navigate(routeName) {
		this.props.navigator.push({
			id: routeName
		});
	}


	render() {
		const { viewStyle, buttonStyle, textStyle } = styles;
		return (
			<View style={styles.viewStyle}>
				<TouchableHighlight style={styles.buttonStyle} onPress={() => Actions.buyPage()}>
					<Text style={{ color: '#42f4c2' }}>Buy</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.buttonStyle} onPress={() => Actions.sellPage()}>
					<Text style={{ color: '#42f4c2' }}>Sell</Text>
				</TouchableHighlight>
			</View>
		);
	}
}



const styles = {
	viewStyle: {
		marginTop: 20,
		alignSelf: 'stretch',
		justifyContent: 'space-around',
		flexDirection: 'row',
		backgroundColor: 'transparent',
		alignItems: 'center',
		paddingTop: 5,
		position: 'relative'
	},
	buttonStyle: {
		borderWidth: 1,
		borderRadius: 200,
		borderColor: '#42f4c2',
		flex: 1,
		alignItems: 'center',
		padding: 10,
		marginRight: 10,
		marginLeft: 10
	},
	textStyle: {
		fontSize: 20,
		color: '#42f4c2'

	}

};

export default BuySell;