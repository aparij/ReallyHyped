import React, { Component } from 'react';
import _ from 'lodash';
//import logo from './logo.svg';
import tagData from './data/data.json';
import './App.css';
import Plot from './components/Plot';
import Suggest from './components/Suggest';


class App extends Component {
  state = {
      data: {},
        };

  componentWillMount(){

    let tagMap = {}
    //iterate over each date
    for(var i = 0; i < tagData.length; i++) {
      var obj = tagData[i];
      //iterate over all the tags on one date
      for (var j = 0; j < obj.tags.length; j++) {
        const tag = obj.tags[j];
        if(_.has(tagMap,tag.tag)){
          let chartTagObj = tagMap[tag.tag];
          chartTagObj.x.push(obj.date);
          chartTagObj.y.push(tag.perc);
          tagMap[tag.tag] = chartTagObj;
        }else{
          let chartTagObj = {x:[],y:[],type: 'scatter',name: tag.tag};
          chartTagObj.x.push(obj.date);
          chartTagObj.y.push(tag.perc);
          tagMap[tag.tag] = chartTagObj;
        }
      }
    }

  let data=[tagMap['java'],tagMap['python'],tagMap['javascript'],tagMap['reactjs']]
  this.setState({data,tagMap});
  }
  render() {
    console.log(Object.keys(this.state.tagMap).map(key=> {return {text:key}}))
    return (
      <div className="App">
        <div className="App-header">
            <Plot
            data={this.state.data}
            />
        </div>
        <Suggest tags={Object.keys(this.state.tagMap).map(key=> {return {text:key}} )}/>
      </div>
    );
  }
}

export default App;
