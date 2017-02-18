import React, {Component} from 'react';
import { View, Text } from 'react-native';


class Buy extends Component {

	constructor (props) {
		super(props)
	}

	render(){
		const { viewStyle, textStyle } = styles;
		return (
			<View style = {styles.viewStyle}>
				<Text> Market Buy </Text>
			</View>
	  )
	}
}

const styles = {
	viewStyle: {
		marginTop: 20,
		marginBottom: 10,
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
}

export default Buy;