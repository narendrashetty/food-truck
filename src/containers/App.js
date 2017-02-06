import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import Map from '../components/map';

export const App = React.createClass({

  componentDidMount() {
  	this.props.actions.fetchData();
  },

  render() {
    return (
      <div className="fullHeight fullWidth">
        <Map Trucks={this.props.Trucks} actions={this.props.actions} />
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