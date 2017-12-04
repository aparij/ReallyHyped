import React, { Component } from 'react';
import _ from 'lodash';
import Grid from 'material-ui/Grid';

import tagData from './data/data.json';
import './App.css';
import Plot from './components/Plot';

import RankingsTable from './components/RankingsTable';
import Suggest from './components/Suggest';
import SelectionTags from './components/SelectionTags';
import TopChanges from './components/TopChanges';
import qs from 'qs';


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
    return parsedQS.keywords;
  }

  render() {
    return (
      <div className="App">
        <h1>StackOverflow Careers Tech Trends</h1>

        <h3>
          The data provided was retrieved from - <a target="_blank" href="https://stackoverflow.com/jobs"> StackOverflow Careers</a><br/>
        </h3>



        <p>
          The data is only for the limited five tags that employers select to show the main technologies.
          It doesn't include the endless "nice to have" list of buzz words that many job posts uncesssary add.
         </p>
        <div className="App-header">
              <Grid container spacing={24}  >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <RankingsTable
                      tags={tagData[tagData.length-1].tags.slice(0,20)}
                      history={this.props.history}
                      location={this.props.location}
                    />
                 </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="top-left-container">
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
                    <Plot
                    data={this.state.data}
                    history={this.props.history}
                    location={this.props.location}
                    />
                  </div>
                </Grid>
              </Grid>
          </div>
        <TopChanges
           history={this.props.history}
           location={this.props.location}
        />
        <div className="footer">
          <div className="footer-element">Follow <a target="_blank" href="https://twitter.com/alex_parij">@aparij</a> </div>   
          <div className="footer-element">Open source on <a target="_blank" href="https://github.com/aparij/ThrillIsGoneLab">Github</a> </div>
          <div className="footer-element">Original data <a target="_blank" href="https://github.com/aparij/soCareers-Data">Github</a> </div>
          <div className="footer-element">Scraping script source <a target="_blank" href="https://github.com/aparij/soCareersScrape">Github</a> </div>
        </div>
      </div>
    );
  }
}

export default App;
