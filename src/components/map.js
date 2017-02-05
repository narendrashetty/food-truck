import React from 'react';
import MapGL from 'react-map-gl';
import Dimensions from 'react-dimensions';

const CONFIG = {
  'mapStyle': 'mapbox://styles/mapbox/basic-v9',
  'mapboxApiAccessToken': 'pk.eyJ1IjoibmFyZW5kcmFzaGV0dHkiLCJhIjoiY2l3am9veHJ2MDAwbDJ0cjI1NTkyM3llNSJ9.l2l38Z5jAyCO0_aOE-ABlA',
  'zoom': 12.011557070552028,
  'startDragLngLat': null,
  'isDragging': null
};

const Map = React.createClass({

  getInitialState() {
    return {
      'isLoading': true,
      'viewport': {},
      'pathTotalLength': 0
    };
  },

  componentDidMount() {
    this.setup(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setup(nextProps);
  },

  setup(props) {
    let latitude = 37.755779;
    let longitude = -122.442066;
    let height = this.props.containerHeight;
    let width = this.props.containerWidth;

    this.setState({
      'viewport': {
        ...CONFIG,
        width,
        height,
        latitude,
        longitude,
      },
      'isLoading': false
    });
  },

  renderLoading() {
    return (
      <div className="fullHeight map__loading">
        Loading
      </div>
    );
  },

  renderMap() {
    return (
      <MapGL
        {...this.state.viewport}
        onChangeViewport={(newViewport) => {
          this.setState({
            'viewport': Object.assign({}, this.state.viewport, newViewport)
          });
        }}
      >
      </MapGL>
    );
  },

  render() {
    return (
      <div className='fullWidth fullHeight map'>
        {(() => {
          if (this.state.isLoading) {
            return this.renderLoading();
          } else {
            return this.renderMap();
          }
        })()}        
      </div>
    );
  }
});

export default Dimensions()(Map);