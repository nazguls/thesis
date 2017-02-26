import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';


class Chart extends Component {

	constructor (props) {
		super(props);
	}

	historicalData(text){
		console.log(text);
	}

	render() {
		const {textStyle} = styles;

		return (
			<View style={styles.viewStyle}>
				<Text onPress={this.historicalData.bind(this, '1 week')} style={styles.textStyle}> 1W </Text>
				<Text onPress={this.historicalData.bind(this, '1 month')} style={styles.textStyle}> 1M </Text>
				<Text onPress={this.historicalData.bind(this, '3 month')} style={styles.textStyle}> 3M </Text>
				<Text onPress={this.historicalData.bind(this, '6 month')} style={styles.textStyle}> 6M </Text>
				<Text onPress={this.historicalData.bind(this, '1 year')} style={styles.textStyle}> 1Y </Text>
				<Text style={styles.textStyle}> ALL </Text>
			</View>
		);
	}
}
const styles = {
	viewStyle: {
		backgroundColor: 'transparent',
		marginTop: 20,
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	textStyle: {
		fontSize: 12,
		color: 'grey',

	}
};


export default Chart;