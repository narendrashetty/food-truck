import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import Map from '../components/map';
import Search from '../components/search';

export const App = React.createClass({

  getInitialState() {
    return {
      'location': [-122.442066, 37.755779],
      'zoom': 12
    };
  },

  componentDidMount() {
  	this.props.actions.fetchData();
  },

  onSuggestSelect(selected) {
    this.setState({
      'location': [selected.location.lng, selected.location.lat],
      'zoom': 16
    });
  },

  render() {
    return (
      <div className="fullHeight fullWidth">
        <Search onSuggestSelect={this.onSuggestSelect} />
        <Map Trucks={this.props.Trucks} actions={this.props.actions} location={this.state.location} zoom={this.state.zoom} />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    'actions': bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);