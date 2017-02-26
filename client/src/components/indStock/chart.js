import React, { Component } from 'react';
import { Text, View, Image, ART, Dimensions } from 'react-native';
import * as makeChart from '../../chartUtils/graphUtil.js';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import axios from 'axios';
import { connect } from 'react-redux';

const d3 = {
  scale,
  shape,
};
const { Surface, Group, Shape, } = ART;

const dimensionsWindow = Dimensions.get('window');
console.log('15: ', dimensionsWindow);

const xAccessor = function(d) {return d.date}

const yAccessor = function(d) {return d.value}

class Chart extends Component {

  constructor(props) {
    super(props);
     this.state = {lineGraph: '', num: '365', period: 'day'};
    }

  historicalData(num, period) {
    console.log('31', num, period);
    this.setState({num, period});
      //, function(console.log(this.state)));
  }

  componentDidUpdate() {
      console.log('37 period: ', this.state.period);
      console.log('37 num: ', this.state.num);


      axios.get('http://localhost:3000/api/stocks/' +
        this.props.stockRes.data.Symbol +
        '?type='+this.state.period+''+'&numperiods='+this.state.num+'&period=historical&attributes=price').then(response => {
        console.log('70', response);
        let data = response.data.Dates.map((dataObj, i) => {
          return {
            date: new Date(dataObj),
            value: response.data.Elements[0].DataSeries.close.values[i]
          };
        });
        const line = makeChart.createLineGraph({
        data, xAccessor, yAccessor, width: 300, height: 200 });
        this.setState({lineGraph: line.path}, function() {
        });
      })

        // console.log('46', response));


    }



    componentWillMount() {
      axios.get('http://localhost:3000/api/stocks/' +
        this.props.stockRes.data.Symbol +
        '?type='+this.state.period+''+'&numperiods='+this.state.num+'&period=historical&attributes=price').then(response => {
        console.log('46', response);
        let data = response.data.Dates.map((dataObj, i) => {
          return {
            date: new Date(dataObj),
            value: response.data.Elements[0].DataSeries.close.values[i]
          };
        });
        console.log('52', data);
        const line = makeChart.createLineGraph({
        data, xAccessor, yAccessor, width: 300, height: 200 });
        this.setState({lineGraph: line.path}, function() {
          console.log('46', line);
        });
      })

        // console.log('46', response));


    }

    //this.state = {lineGraph: ''};
  render() {

    const {textStyle} = styles;

    return (
      <View style={{backgroundColor: 'transparent'}}>
       <Surface width={500} height={200}>
       <Group x={100} y={0}>
       <Shape
          d={this.state.lineGraph}
          stroke="orange"
          strokeWidth={3} />
         </Group>
        </Surface>
          <View style={styles.viewStyle}>
        <Text onPress={this.historicalData.bind(this, 1, 'week')} style={styles.textStyle}> 1W </Text>
        <Text onPress={this.historicalData.bind(this, 1, 'month')} style={styles.textStyle}> 1M </Text>
        <Text onPress={this.historicalData.bind(this, 3, 'month')} style={styles.textStyle}> 3M </Text>
        <Text onPress={this.historicalData.bind(this, 6, 'month')} style={styles.textStyle}> 6M </Text>
        <Text onPress={this.historicalData.bind(this, 1, 'year')} style={styles.textStyle}> 1Y </Text>
        <Text style={styles.textStyle}> ALL </Text>
      </View>
      </View>
    )
  }
};





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
const mapStateToProps = ({search}) => {
  const { stockRes } = search;
  return {
    stockRes: stockRes
  };
};

export default connect(mapStateToProps, {})(Chart);