import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';


class News extends Component {
	constructor() {
		super();

		this.state={
			news: ''
		}
	}

	componentWillMount(){
		axios.get('http://127.0.0.1:3000/api/news/' + this.props.stockRes.data.Symbol)
		.then(response => {
			this.setState({
				news: response
			})
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		console.log(' from news', this.state.news)
		return(
			<View></View>
		)
	}

}

const mapStateToProps = ({ search }) => {
	const { stockRes } = search;
	return {
		stockRes
	};
};

export default connect(mapStateToProps, {})(News);
