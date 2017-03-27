import React, { Component } from 'react';
import _ from 'lodash';

//import logo from './logo.svg';
import tagData from './data/data.json';
import './App.css';
import Plot from './components/Plot';
import Suggest from './components/Suggest';
import qs from 'qs';


class App extends Component {
  state = {
      data: {},
  };

  componentWillMount(){
    console.log(this.props.location.search);
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
    let kws = this.getKeywordsFromQS(this.props.location.search);
    console.log(kws);
    let data = []
    if(!_.isEmpty(kws)){
      data = kws.split(",").map(item=>tagMap[item]);
    }
    //let data=[tagMap['java'],tagMap['python'],tagMap['javascript'],tagMap['reactjs']]
    this.setState({data,tagMap});
  }

  componentWillReceiveProps(nextProps) {
    console.log("component will receive props",nextProps.location.search)
    let kws = this.getKeywordsFromQS(nextProps.location.search);
    console.log(kws);
    let data = []
    if(!_.isEmpty(kws)){
      data = kws.split(",").map(item=>this.state.tagMap[item]);
    }
    this.setState({data});

}

getKeywordsFromQS(query){
  if(query===""){
    return "";
  }

  const parsedQS = qs.parse(query.substring(1));
  console.log(parsedQS);
  return parsedQS.keywords;
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
            <Plot
            data={this.state.data}
            history={this.props.history}
            location={this.props.location}
            />
        </div>
        <Suggest
          tags={Object.keys(this.state.tagMap).map(key=> {return {text:key}} )}
          history={this.props.history}
          location={this.props.location}
      />
      </div>
    );
  }
}

export default App;
