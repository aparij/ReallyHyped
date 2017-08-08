import React, { Component } from 'react';
import _ from 'lodash';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import tagData from './data/data.json';
import './App.css';
import Plot from './components/Plot';

import RankingsTable from './components/RankingsTable';
import Suggest from './components/Suggest';
import SelectionTags from './components/SelectionTags';
import TopChanges from './components/TopChanges';
import qs from 'qs';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends Component {
  state = {
      data: {},
  };

  componentWillMount(){
    let tagMap = {}
    let allExistingTags={};//used to impute zero values when a tag is not encountered on some date
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
        allExistingTags[tag.tag]=1;
      }//end each tag loop

      //find all the tags with zero counts and add them to chart with zero percent values
      if(i>0){
        Object.keys(allExistingTags).map((key, index)  => {
            if(allExistingTags[key]===0){
              let chartTagObj = tagMap[key];
              chartTagObj.x.push(obj.date);
              chartTagObj.y.push(0);
              tagMap[key] = chartTagObj;
            }
          });

        //reset all the tag counts before the next iteration
        Object.keys(allExistingTags).map(function(key, index) {
            allExistingTags[key] = 0;
          });
      }
    }//end of date loop
    let kws = this.getKeywordsFromQS(this.props.location.search);
    let data = []
    if(!_.isEmpty(kws)){
      data = kws.split(",").map(item=>tagMap[item]);
    }
    this.setState({data,tagMap});
  }

  componentWillReceiveProps(nextProps) {
    let kws = this.getKeywordsFromQS(nextProps.location.search);
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
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
        <h1>StackOveflow Careers Tech Trends</h1>

        <h3>
          The data provided was retrieved from - <a target="_blank" href="https://stackoverflow.com/jobs"> StackOveflow Careers</a><br/>
          Tech trends on the job market.
        </h3>
        <p>
          The data is only for the limited five tags that employers select to show the main technologies.
          It doesn't include the endless "nice to have" list of buzz words that many job posts uncesssary add.
         </p>
        <div className="App-header">
            <div className="top-plot-container">

              <RankingsTable
                tags={tagData[tagData.length-1].tags.slice(0,21)}
                history={this.props.history}
                location={this.props.location}
              />

              <Plot
              data={this.state.data}
              history={this.props.history}
              location={this.props.location}
              />

            </div>
        </div>
        <Suggest
          tags={Object.keys(this.state.tagMap).map(key=> {return {text:key}} )}
          history={this.props.history}
          location={this.props.location}
        />
        <SelectionTags
          tags={_.map(this.state.data, 'name')}
          history={this.props.history}
          location={this.props.location}
        />

        <TopChanges
           history={this.props.history}
           location={this.props.location}
        />
        <div className="footer">

          <div>Open source on <a target="_blank" href="https://github.com/aparij/ThrillIsGoneLab">Github</a> </div>
          <div>Original data <a target="_blank" href="https://github.com/aparij/soCareers-Data">Github</a> </div>
          <div>Scraping script source <a target="_blank" href="https://github.com/aparij/soCareersScrape">Github</a> </div>
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
