import React, { Component } from 'react';
import { Text, View, Image, ART, Dimensions, TouchableWithoutFeedback } from 'react-native';
import * as makeChart from '../../chartUtils/graphUtil.js';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, CardSection } from '../common';

const d3 = {
  scale,
  shape,
};
const { Surface, Group, Shape, } = ART;

const dimensionsWindow = Dimensions.get('window');
console.log('15: ', dimensionsWindow);

const xAccessor = function(d) { return d.date }

const yAccessor = function(d) { return d.value }

class Chart extends Component {

  constructor(props) {
    super(props);
     this.state = {
     	lineGraph: '',
     	period: 'day',
     	num: 365
     };
    }

  historicalData(num, period, type) {
  	console.log('num', num)
  	console.log('period', period);
  	console.log('type', type)
  	this.setState({ period: period, num: num  });
  	axios.get('http://localhost:3000/api/stocks/' +
      this.props.stockRes.data.Symbol +
      '?type='+period+'&numperiods=' + num + '&period=historical&attributes=' + type).then(response => {
      	console.log('43:', response)
      	console.log('this type', type)
      let data = response.data.Dates.map((dataObj, i) => {
        return {
          date: new Date(dataObj),
          value: type === 'price' ? response.data.Elements[0].DataSeries.close.values[i] : response.data.Elements[0].DataSeries.volume.values[i]
        };
      });
      const line = makeChart.createLineGraph({
      data, xAccessor, yAccessor, width: 300, height: 200 });
      this.setState({lineGraph: line.path})
    });
  }

  componentDidMount() {
  	console.log('statenum', this.state.num);
  	console.log('stateperiod', this.state.period);
    this.historicalData(this.state.num, this.state.period, 'price')
  }

    //this.state = {lineGraph: ''};
  render() {
    return (
    	<View>
    	<Text onPress={this.historicalData.bind(this, this.state.num, this.state.period, 'volume')}> Switch to Volumn View </Text>
      <View  style={{ backgroundColor: 'transparent' }}>
       <Surface width={500} height={200} >
       <Group x={100} y={0}>
       <Shape
          d={this.state.lineGraph}
          stroke="orange"
          strokeWidth={2}
          />
       </Group>
      </Surface>
      </View>

      <View style={styles.viewStyle}>
        <Text onPress={this.historicalData.bind(this, 7, 'day', 'price')} style={styles.textStyle}> 1W </Text>
        <Text onPress={this.historicalData.bind(this, 30, 'day', 'price')} style={styles.textStyle}> 1M </Text>
        <Text onPress={this.historicalData.bind(this, 90, 'day', 'price')} style={styles.textStyle}> 3M </Text>
        <Text onPress={this.historicalData.bind(this, 180, 'day', 'price')} style={styles.textStyle}> 6M </Text>
        <Text onPress={this.historicalData.bind(this, 365, 'day', 'price')} style={styles.textStyle}> 1Y </Text>
        <Text style={styles.textStyle}> ALL </Text>
      </View>
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
		justifyContent: 'space-around',
		width: null,
		height: null,
	},
	textStyle: {
		fontSize: 12,
		color: 'grey',

	}
};
const mapStateToProps = ({search}) => {
  const { stockRes } = search;
  return {
    stockRes: stockRes
  };
};

export default connect(mapStateToProps, {})(Chart);