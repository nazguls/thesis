import React, { Component } from 'react';
import { Text, View, Image, ART, Dimensions, StyleSheet, Color } from 'react-native';
import * as makeChart from '../../chartUtils/graphUtil.js';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

import axios from 'axios';
import { connect } from 'react-redux';


const { Surface, Group, Shape, } = ART;

const PaddingSize = 20;
const TickWidth = PaddingSize * 2;

const dimensionsWindow = Dimensions.get('window');
const width = Math.round(dimensionsWindow.width * 0.9);
const height = Math.round(dimensionsWindow.height * 0.5);
const graphWidth = Math.round(dimensionsWindow.width * 0.9) - 40;
const graphHeight = Math.round(dimensionsWindow.height * 0.5) - 20;


const xAccessor = (d) => { return d.date; };
const yAccessor = (d) => { return d.value; };

class Chart extends Component {

  constructor(props) {
		super(props);

    this.state = { lineGraph: '', ticks: '', scale: ''};
        console.log('28');

    }

    componentWillMount() {
      let context = this;

      axios.get(`http://localhost:3000/api/portfolio/${this.props.email}?period=historical`).then(response => {
        const data = response.data.map(dataObj => {
          return {
            date: new Date(dataObj.date),
            value: dataObj.portfolioValue
          };
        });
        const line = makeChart.createLineGraph({
        data, xAccessor, yAccessor, width: graphWidth, height: graphHeight });
        context.setState({lineGraph: line.path, ticks: line.ticks, scale: line.scale }, () => {console.log('41' )});
        });


    }

  render() {
    let tickXFormat;
    // const {
    //   x: scaleX,
    // } = this.state.scale;
    // if(this.state.scale !== undefined) {console.log('46', this.state.scale.x.formatTicks(null, '%b %d')); }
    console.log('55', this.state.lineGraph);

    //let tickXFormat = console.log('56', this.state.scale.x(new Date())); //.scale(4,5);
    console.log('58', this.state.ticks);
    if(this.state.lineGraph !== '') {
      tickXFormat = this.state.scale.x.tickFormat(null, '%b %d');
    }
    //console.log(tickXFormat.x);
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <Surface width={500} height={200}>
          <Group x={100} y={0}>
           <Shape
              d={this.state.lineGraph}
              stroke="orange"
              strokeWidth={3}
           />
          </Group>
        </Surface>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },

  tickLabelX: {
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    textAlign: 'center',
  },

  ticksYContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  tickLabelY: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },

  tickLabelYText: {
    fontSize: 12,
    textAlign: 'center',
  },

  ticksYDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 100,
  },
});


const mapStateToProps = (state) => {
 const { email } = state.auth;
  return ({
    email
  });
};

export default connect(mapStateToProps, {})(Chart);
