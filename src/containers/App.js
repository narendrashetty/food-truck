import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export const App = React.createClass({

  getInitialState() {
    
  },

  componentDidMount() {

  },

  render() {
    return (
      <div className="fullHeight fullWidth">
        
      </div>
    );
  }
});

export default App;

// function mapStateToProps() {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     'actions': bindActionCreators(actions, dispatch)
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);