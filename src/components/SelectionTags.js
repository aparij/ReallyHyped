import React from 'react';
import Chip from 'material-ui/Chip';
import _ from 'lodash';
import qs from 'qs';

let propTypes = {
  location: React.PropTypes.object.isRequired,
  tags: React.PropTypes.array.isRequired
};


export default class SelectionTags extends React.Component {

  constructor(props) {
     super(props);
     this.handleRequestDelete = this.handleRequestDelete.bind(this);
     this.styles = {
       chip: {
         margin: 4,
       },
       wrapper: {
         display: 'flex',
         flexWrap: 'wrap',
       },
     };
   }

   handleRequestDelete(keyword){
     let oldQuery = this.props.location.search;
     oldQuery = qs.parse(oldQuery.substring(1));
     let payload = oldQuery["keywords"].split(",").filter(item => item!==keyword)
     let newQueryPayload = { "keywords": payload.join() };
     let path = this.props.location.pathname;
     this.props.history.push("?"+qs.stringify(newQueryPayload,{ encode: true }));
   };

   renderChip(data,index) {
     return (
       <Chip
         key={index}
         onRequestDelete={()=>this.handleRequestDelete(data)}
         style={this.styles.chip}
         label = {data}
       />
     );
   }

   render() {
     if(_.isEmpty(this.props.tags)){
       return null;
     }

     return (
       <div style={this.styles.wrapper}>
         {this.props.tags.map(this.renderChip, this)}
       </div>
     );
   }

}

SelectionTags.propTypes = propTypes;
