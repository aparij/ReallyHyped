import React from 'react';

import qs from 'qs';
import _ from 'lodash';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Grid from 'material-ui/Grid';

import changesData from '../data/top_changes.json';

const style = {
  margin: 12,
};

class TopChanges  extends React.Component {
   state = {
    btnSelection: "top25",
  };

 componentWillMount() {
   //iterate over each date
   for (var i = 0; i < changesData.length; i++) {
     var obj = changesData[i];
   }
 }

  render(){
    return (
      <div className="changes">
        <div className="buttons-container">
          <div>
            What tech is rising or falling fastest
          </div>
          <div>
            <Button raised key="top25" color="primary" style={style} onClick={() => this.clickHandler("top25")}>Top 25</Button>
            <Button raised key="top50"  color="primary" style={style} onClick={() => this.clickHandler("top50")}>Top 50</Button>
            <Button raised key="topALL" color="primary" style={style} onClick={() => this.clickHandler("topALL")}>All </Button>
          </div>
        </div>
        <div className="changes-tables-container">
              <Grid container spacing={24}>
                 <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Table >
                      {this.renderTableHeader("BEST")}
                     <TableBody>
                        {this.renderRows("best")}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                   <Table >
                     {this.renderTableHeader("WORST")}
                      <TableBody>
                        {this.renderRows("worst")}
                      </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </div>
      </div>
    )
  }

  renderTableHeader(type){
    return (
      <TableHead >
        <TableRow className="table-row">
          <TableCell colSpan="3"  style={{textAlign: 'center'}}>
            {type} PERFORMERS
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="table-column">Tech</TableCell>
          <TableCell className="table-column">Y/Y Change</TableCell>
          <TableCell className="table-column">Rank</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  renderRows(type){
    let rows = changesData[this.state.btnSelection][type].map((v,index)=>
      <TableRow onClick={(event)=>this.rowSelected(index,type)} key={"row-"+v.tag} className="table-row table-pointer">
        <TableCell key={"cell-tag-"+v.tag} className="table-column table-pointer">{v.tag}</TableCell>
        <TableCell key={"cell-change-"+index} className="table-column table-pointer"> {v.change} %</TableCell>
        <TableCell key={"cell-rank-"+v.rank} className="table-column table-pointer">{v.rank}</TableCell>
      </TableRow>
    )
    return (rows);
  }

  rowSelected(index,type){
    if(!_.isUndefined(index)){
      this.applyQuery(changesData[this.state.btnSelection][type][index].tag);
    }
  };

  clickHandler = (value) => {
    this.setState({
      btnSelection: value
    });
  };

  applyQuery = (selection) =>{
    let oldQuery = this.props.location.search;
    oldQuery = qs.parse(oldQuery.substring(1));
    let payload = [selection]
    if(!_.isEmpty(oldQuery.keywords)){
      payload = _.union([payload,oldQuery.keywords]);
    }
    let newQueryPayload = { "keywords": payload.join() };
    this.props.history.push("?"+qs.stringify(newQueryPayload,{ encode: true }));
    this.setState({value: ""});
  }

}

export default TopChanges;