import React from 'react';
import Geosuggest from 'react-geosuggest';

const Search = React.createClass({

  onSuggestSelect() {

  },

  render() {
    return (
      <div className="searchBox">
        <div className="searchBox__title">Find a Food truck:</div>
        <Geosuggest
          location={new google.maps.LatLng(52.363632, 4.926588)}
          radius="20"
          onClick={this.props.gotoSearch}
          placeholder="Hungry?"
          inputClassName="searchBox__input"
          onSuggestSelect={this.props.onSuggestSelect}
        />
      </div>
    );
  }
});

export default Search;