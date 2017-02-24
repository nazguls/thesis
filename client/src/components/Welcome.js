import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from './common';
import { Actions } from 'react-native-router-flux';

class Welcome extends Component {
	constructor(props) {
		super(props);
	}

	buttonPressed() {
		Actions.auth();
	}

	render() {
		const { viewStyle, textStyle, background, logIn, logInButton } = styles;
		return (
			<Image source={require('./assets/background3.jpg')} style={background}>
					<Text style={textStyle}> lime </Text>
					<View style={logInButton}>
						<Text style={logIn} onPress={()=>this.buttonPressed(this)}>Login</Text>
					</View>
			</Image>
		);
	}
}


export default Welcome;

const styles = {
	background: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: null,
		height: null
	},
	logInButton: {
		marginTop: 50,
		alignSelf: 'stretch',
		marginRight: 20,
		marginLeft: 20,
		paddingTop: 10,
		paddingBottom: 10,
		borderWidth: 1

	},
	logIn: {
		fontSize: 15,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'

	},
	textStyle: {
		fontSize: 70,
		fontWeight: '100',
		textAlign: 'center',
		color: 'black',

		backgroundColor: 'transparent'
	}

};