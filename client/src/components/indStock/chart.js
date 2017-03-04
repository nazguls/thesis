import React, { Component } from 'react';
import { Text, View, Image, ART, Dimensions, TouchableWithoutFeedback } from 'react-native';
import * as makeChart from '../../chartUtils/graphUtil.js';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import axios from 'axios';
import { connect } from 'react-redux';
import { selectChartView } from '../../actions';


const d3 = {
  scale,
  shape,
};
const { Surface, Group, Shape, } = ART;

const dimensionsWindow = Dimensions.get('window');

const xAccessor = (d) => { return d.date; };

const yAccessor = (d) => { return d.value; };

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lineGraph: '',
      num: 365,
      priceView: 'price'
    };
  }

  componentDidMount() {
    this.historicalData(this.state.num, 'price', 'b');
  }

  historicalData(num, typeChart, buttonOrImage) {
    console.log('print this', num, typeChart, buttonOrImage);
    // chartView = typeChart === 'price' ? 'Share Price' : 'Daily Trading Volume';

    let chartView = typeChart;
    this.setState({ num });
    if (buttonOrImage === 'b') {
      this.setState({ priceView: 'price' });
    } else if (buttonOrImage === 'i') {
        if (this.state.priceView === 'price') {
          chartView = 'volume';
          this.setState({ priceView: 'volume' });
        } else {
          chartView = 'price';
          this.setState({ priceView: 'price' });
      }
    }

    console.log('chartView', chartView);
    this.props.selectChartView(chartView);



    // const type = type1;
    // if (type === 'price') {
    //   this.state.view = true;
    // }
    // let chartView = '';
    // if (this.state.view === false) {
    //   chartView = 'Daily Tradig Volumn';
    //   type = 'volume';
    //   this.setState({ view: !this.state.view });
    // } else {
    //   chartView = 'Share Price';
    //   type = 'price';
    //   this.setState({ view: !this.state.view });
    // }


    axios.get('http://localhost:3000/api/stocks/' +
      this.props.stockRes.data.Symbol +
      '?type=day&numperiods=' +
      num + '&period=historical&attributes=' + chartView)
    .then(response => {
      console.log('50', response);
      let data;
      if (this.props.stockRes.data.Symbol === 'SPX') {
          console.log(response.data);
          data = response.data.map((dataObj) => {
            return {
            date: new Date(dataObj.date),
            value: dataObj.value
          };
        });
      } else {
        data = response.data.Dates.map((dataObj, i) => {
          return {
            date: new Date(dataObj),
            value: chartView === 'price' ? response.data.Elements[0].DataSeries.close.values[i] : response.data.Elements[0].DataSeries.volume.values[i]
          };
        });
      }
      const line = makeChart.createLineGraph({
      data, xAccessor, yAccessor, width: 300, height: 200 });
      this.setState({ lineGraph: line.path });
    });
  }

    //this.state = {lineGraph: ''};
  render() {
    return (
      <View>
        <Text style={styles.chartTypeText}> {this.state.chartView} </Text>
        <TouchableWithoutFeedback onPress={this.historicalData.bind(this, this.state.num, 'volume', 'i')}>

        <View style={{ backgroundColor: 'transparent' }}>
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
      </TouchableWithoutFeedback>

      <View style={styles.viewStyle}>
        <Text
          onPress={this.historicalData.bind(this, 7, 'price', 'b')}
          style={styles.textStyle}
        > 1W </Text>
        <Text
          onPress={this.historicalData.bind(this, 30, 'price', 'b')}
          style={styles.textStyle}
        > 1M </Text>
        <Text
          onPress={this.historicalData.bind(this, 90, 'price', 'b')}
          style={styles.textStyle}
        > 3M </Text>
        <Text
          onPress={this.historicalData.bind(this, 180, 'price', 'b')}
          style={styles.textStyle}
        > 6M </Text>
        <Text
          onPress={this.historicalData.bind(this, 365, 'price', 'b')}
          style={styles.textStyle}
        > 1Y </Text>
        <Text style={styles.textStyle}> ALL </Text>
      </View>
      </View>
    );
  }
}


const styles = {
  chartTypeText: {
    marginLeft: 20,
    flexDirection: 'row',
    fontSize: 15,
    color: 'orange',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    justifyContent: 'center'
  },
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
const mapStateToProps = ({ search }) => {
  const { stockRes } = search;
  return {
    stockRes
  };
};

// <Text onPress={this.historicalData.bind(this, this.state.num, this.state.period, 'volume')}> Switch to Volumn View </Text>

export default connect(mapStateToProps, { selectChartView })(Chart);
