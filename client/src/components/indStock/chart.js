import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';


class Chart extends Component {

	constructor (props) {
		super(props)
	}

	render(){
		console.log('from charts' , this.props);
		return (
			<Image source ={{ uri: this.props.Chart }} style={{'width': 350 , 'height': 150, marginTop: 50}}/>
	  )
	}
}

export default Chart;