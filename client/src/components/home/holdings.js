import React, { Component } from 'react';
import { Text, View, Button, TouchableHighlight } from 'react-native';

class Holdings extends Component {

	constructor(props) {
		super(props);

		this.navigate = this.navigate.bind(this);
	}

	navigate(routeName){
		console.log(routeName);
		this.props.navigator.push({
			id: routeName
		})
	}


	render(){
		const { viewStyle, textStyle } = styles;
		return (
			<View style = {styles.viewStyle} >
				<TouchableHighlight onPress={this.navigate.bind(this, 'indStock')}>
					<Text> AAPL </Text>
				</TouchableHighlight>
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