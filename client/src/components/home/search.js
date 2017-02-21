import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from '../common';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { searchChanged, searchStock } from '../../actions';

class Search extends Component {

	onSearchChange(text) {
		this.props.searchChanged(text);
	}

	onButtonPress() {
		const { search } = this.props;
		console.log('button pressed', search);
		this.props.searchStock({ search })
	}


	render() {
		const { viewStyle } = styles;
		return (
			<Card>
				<CardSection>
					<Input label='Search' onChangeText={this.onSearchChange.bind(this)} value={this.props.search} />

				</CardSection>

				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Search
					</Button>
				</CardSection>

			</Card>


		);
	}
}
const styles = {
	viewStyle: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
};

const mapStateToProps = ({ search }) => {

	return (
		search
	);
};
export default connect(mapStateToProps, { searchChanged, searchStock })(Search);
