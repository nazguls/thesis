import React, { Component } from 'react';
import { Text, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import { recommendations } from '../../actions';
import axios from 'axios';


class News extends Component {
	constructor() {
		super();

		this.state = {
			news: [],
			sentiment: ''
		};
	}

	componentWillMount() {

		axios.get('http://127.0.0.1:3000/api/news/' + this.props.stockRes.data.Symbol)
		.then(response => {
			const newsArray = response.data.map(news => news.description);
			this.setState({ news: response.data });
			axios.post('http://127.0.0.1:3000/api/sentiment/sentimentAnalysis', {
				params: {
					newsArray
				}
			}).then(result => {
				console.log('sentiment score: ', result.data.actions[0].result.sentiment_analysis[0].aggregate.score);
				this.setState({ sentiment: result.data.actions[0].result.sentiment_analysis[0].aggregate.score })
				recommendations(result.data.actions[0].result.sentiment_analysis[0].aggregate.score);
			});
		});
	}

	render() {
		const newsArticle = this.state.news.map((news, key) => {
			return (
				<View key={key} style={styles.viewStyle}>
					<Text style={styles.textStyle} onPress={()=> Linking.openURL(news.link)}>{ news.description }</Text>
				</View>
			);
		});
		return (
			<View>
			<View>
				{newsArticle}
			</View>
			<Text style = {styles.textstyle}>{ this.state.sentiment }</Text>
			</View>
		);
	}
}


const mapStateToProps = ({ search }) => {
	const { stockRes } = search;
	return {
		stockRes,
		search
	};
};

const styles = {
	viewStyle: {
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: 'transparent',
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		borderColor: '#ddd',
    borderBottomWidth: 1,
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative'
	},
	textStyle: {
		color: '#42f4c2'
	}
}

export default connect(mapStateToProps, { recommendations })(News);

