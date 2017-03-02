import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { CardSection, Input, Button, Background, TouchableHighlight } from '../common';
import { connect } from 'react-redux';
import { searchChanged, searchStock } from '../../actions';
import ticker from '../../ticker.json';

class Search extends Component {
	constructor() {
		super();
		this.state = {
			ticker: []
		}
	}

	onSearchChange(text) {
		this.props.searchChanged(text);
		let appendTicker = ticker.filter(ticker => {
			if(ticker.Symbol.toUpperCase().indexOf(text.toUpperCase()) !== -1) {
				return (ticker.Symbol);
			}
		});
		this.setState({ ticker: appendTicker });
	}

	onButtonPress() {
		console.log(this.props.search);
		const { search } = this.props;
		this.props.searchStock({ search });
	}

	tickerPressed(text) {
		console.log(text);
		this.props.searchStock({ search: text });
	}


	render() {
		const { viewStyle } = styles;
		const searchList = this.state.ticker;
		return (
			<Background>
				<CardSection>
					<Input
					label='Search'
					onChangeText={this.onSearchChange.bind(this)}
					value={this.props.search}
					/>
				</CardSection>

				<ScrollView>
					<View style={styles.viewStyles}>
					{searchList.map((suggestion, key) => {
						return (
							<View key={key} style={styles.boxStyle}>
								<Text style={styles.textStyle} onPress={()=> this.tickerPressed(suggestion.Symbol)}> {suggestion.Symbol} : {suggestion.Name}</Text>
							</View>
						)
					})}
					</View>
				</ScrollView>

				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Search
					</Button>
				</CardSection>

			</Background>


		);
	}
}
const styles = {
	viewStyle: {
		height: 300
	},
	boxStyle: {
		borderWidth: 1,
		padding: 5,
		borderRadius: 5,
		borderColor: 'gray'


	},
	textStyle: {
		backgroundColor: 'transparent',
		fontSize: 15,
		color: '#42f4c2'
	}
};

const mapStateToProps = ({ search }) => {

	return (
		search
	);
};
export default connect(mapStateToProps, { searchChanged, searchStock })(Search);
