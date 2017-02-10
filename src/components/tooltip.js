import React from 'react';

const Tooltip = React.createClass({
  render() {


    if (this.props.isVisible) {
      return (
        <div
          className="tooltip"
          style={{
            'display': 'block',
            'top': this.props.config.position[1] - 30,
            'left': this.props.config.position[0]
          }}
        ></div>
      );
    } else {
      return (
        <div
          className="tooltip"
          style={{
            'display': 'none'
          }}
        ></div>
      )
    }
  }
});

export default Tooltip;