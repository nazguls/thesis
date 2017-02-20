import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

class Chart extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('from charts component', this.props);
		return (
			<View>
				<Image source={{ uri: this.props.Chart }} style={{ "width": 350, "height": 150, marginTop: 50 }} />
			</View>
		);
	}
}
export default Chart;