import Autosuggest from 'react-autosuggest';
import React from 'react';
import '../styles/Suggest.css';
import qs from 'qs';
import _ from 'lodash';
import Button from 'material-ui/Button';

const style = {
  margin: 12,
};


// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value,suggestionsArr) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : suggestionsArr.filter(lang =>
    lang.text.toLowerCase().slice(0, inputLength) === inputValue
  );
};




// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.text;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.text}
  </div>
);

class Suggest extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionSelected = (event,{ suggestion, suggestionValue,}) => {
    let oldQuery = this.props.location.search;
    oldQuery = qs.parse(oldQuery.substring(1));
    let payload = [suggestionValue]
    if(!_.isEmpty(oldQuery.keywords)){
      payload = _.union([payload,oldQuery.keywords]);
    }
    let newQueryPayload = { "keywords": payload.join() };
    let path = this.props.location.pathname;
    this.props.history.push("?"+qs.stringify(newQueryPayload,{ encode: true }));
    this.setState({value: ""});
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value,this.props.tags)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Start typing a technology name',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <div className="suggest-input-row">

        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <Button raised style={style} color="primary" onClick={() => this.clickHandlerBtn()} >Clear</Button>
      </div>
    );
  }
  clickHandlerBtn = () => {
    this.props.history.push("?");
  };


}
export default Suggest;
