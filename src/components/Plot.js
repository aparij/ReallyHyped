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
  componentDidUpdate() {
    if(_.isEmpty(this.props.data)){
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
      margin: {
        t: 0, r: 0, l: 30
      },
      xaxis: {
        gridcolor: 'transparent'
      }
    }, {
      displayModeBar: false
    });
  }

}
export default Plot;
