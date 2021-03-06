import React from 'react';

import qs from 'qs';
import _ from 'lodash';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import GoogleAnalytics from 'react-ga';

class RankingsTable  extends React.Component {
   state = {
  };

  render(){
    return (
      <div className="rankings">
        <div className="rankings-tables-container">
          <div className="changes-table">

          <Table >
            {this.renderTableHeader()}
           <TableBody>
              {this.renderRows()}
            </TableBody>
          </Table>
          </div>
        </div>
      </div>
    )
  }

  renderTableHeader(){
    return (
      <TableHead>
        <TableRow className="table-row">
          <TableCell className="table-column table-column__rank">RANK</TableCell>
          <TableCell className="table-column" >TECH</TableCell>
          <TableCell className="table-column">% OF POSTINGS</TableCell>

        </TableRow>
      </TableHead>
    )
  }

  renderRows(){
    let rows = this.props.tags.map((v,index)=>
      <TableRow onClick={(event)=>this.rowSelected(index)} key={"row-"+v.value.rank} className="table-row">
        <TableCell className="table-column table-column__rank table-pointer" key={"cell-rank-"+v.value.rank}>{v.value.rank}</TableCell>
        <TableCell className="table-column table-pointer" key={"cell-tag-"+v.name}>{v.name}</TableCell>
        <TableCell className="table-column table-pointer" key={"cell-perc-"+index}> {v.value.perc} %</TableCell>
      </TableRow>
    )
    return (rows);
  }

  rowSelected = (rowIndex) => {
    if(!_.isUndefined(rowIndex)){
      this.applyQuery(this.props.tags[rowIndex].name);
      
    }
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
    GoogleAnalytics.event({
      category: 'Navigation',
      action: 'Selected Rankings Row',
      label: selection
    });
  }

}

export default RankingsTable;