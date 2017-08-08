/* global Plotly */
import React from 'react';
import _ from "lodash";

class Plot extends React.Component {
  componentDidMount() {
     if(_.isEmpty(this.props.data)){
       return;
     }
	   this.drawPlot();
  }
  componentDidUpdate(prevProps,prevState) {
    if(_.isEmpty(this.props.data) && _.isEmpty(prevProps.data)){
      return;
    }
    this.drawPlot();
  }

  render() {
    return (
      <div id="plot"></div>
    );
  }

  drawPlot(){
    Plotly.newPlot('plot',this.props.data, {
      //margin: {
      //  t: 0, r: 0, l: 30
      //},

      margin: {
        l: 50,
        r: 30,
        b: 30,
        t: 40,
        pad: 4
      },
      xaxis: {
        gridcolor: 'transparent',
        zeroline: true,
      },
      yaxis:{
        title: '% of job posts',
        zeroline:true,
        autorange: true
      }
    }, {
      displayModeBar: false
    });
  }

}
export default Plot;
