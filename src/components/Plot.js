/* global Plotly */
import React from 'react';

class Plot extends React.Component {
  componentDidMount() {
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

  render() {
    return (
      <div id="plot"></div>
    );
  }
}

export default Plot;
