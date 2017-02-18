import React, {Component} from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';


class BuySell extends Component {

	constructor (props) {
		super(props)
		this.navigate = this.navigate.bind(this);
	}

	navigate(routeName) {
		this.props.navigate.push({
			id: routeName
		})
	}


	render(){
		const { viewStyle, buttonStyle, textStyle } = styles;
		return (
			<View style = {styles.viewStyle}>
				<TouchableHighlight style={styles.buttonStyle} onPress={this.navigate.bind(this, 'buy')}>
					<Text>Buy</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.buttonStyle} onPress={this.navigate.bind(this, 'sell')}>
					<Text>Sell</Text>
				</TouchableHighlight>
			</View>
		)
	}
}



const styles = {
	viewStyle: {
		marginTop: 20,
		alignSelf: 'stretch',
		justifyContent: 'space-around',
		flexDirection: 'row',
		backgroundColor: '#F8F8F8',
		alignItems: 'center',
		paddingTop: 5,
		position: 'relative'
	},
	buttonStyle: {
		borderWidth: 1,
		flex: 1,
		alignItems: 'center',
		padding: 10,
		marginRight: 10,
		marginLeft: 10
	},
	textStyle: {
		fontSize: 20
	}

};

export default BuySell;