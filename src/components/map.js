import React from 'react';
import MapGL from 'react-map-gl';
import Dimensions from 'react-dimensions';
import HTMLOverlay from 'react-map-gl/dist/overlays/html.react.js';
import ViewportMercator from 'viewport-mercator-project';

const CONFIG = {
  'mapStyle': 'mapbox://styles/mapbox/basic-v9',
  'mapboxApiAccessToken': 'pk.eyJ1IjoibmFyZW5kcmFzaGV0dHkiLCJhIjoiY2l3am9veHJ2MDAwbDJ0cjI1NTkyM3llNSJ9.l2l38Z5jAyCO0_aOE-ABlA',
  'zoom': 12,
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
    let height = props.containerHeight;
    let width = props.containerWidth;
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

  renderDots(config) {
    const sourceProject = config.project([-122.442066, 37.755779]);

    var xstart = sourceProject[0] - (config.width / 2);
    var xend = sourceProject[0] + (config.width / 2) - 10;
    var ystart = sourceProject[1] - (config.height / 2);
    var yend = sourceProject[1] + (config.height / 2) - 10;

    // var west = config.unproject([xstart, sourceProject[1]]);
    // var east = config.unproject([sourceProject[1], xend]);

    // var north = config.unproject([ystart, sourceProject[0]]);
    // var south = config.unproject([sourceProject[0], yend]);

    if (!this.props.Trucks.get('isLoading')) {
      const bounds = this.refs.map._map.getBounds();
      const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
      // this.props.actions.computeVisible({north, south, east, west})      
      const points = this.props.Trucks.get('cluster').getClusters(bbox, this.state.viewport.zoom);
      console.log(points);
      return (
        <div>
          {points.map((loc, index) => {
            const locProject = config.project(loc.geometry.coordinates);
            return (
              <div key={index} className="marker" style={{
                'top': locProject[1],
                'left': locProject[0],
                'position': 'absolute',
                'background': '#000',
                'width': '10px',
                'height': '10px'
              }}>
              </div>
            );
          })}
        </div>
      );
    }
  },

  renderOverlay() {
    return (
      <div>
        <HTMLOverlay
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          isDragging={false}
          redraw={this.renderDots}
          zoom={this.state.viewport.zoom}
          longitude={this.state.viewport.longitude}
          latitude={this.state.viewport.latitude}
        />
      </div>
    );
  },

  renderMap() {
    return (
      <MapGL
        ref="map"
        {...this.state.viewport}
        onChangeViewport={(newViewport) => {
          this.setState({
            'viewport': Object.assign({}, this.state.viewport, newViewport)
          });
        }}
      >
        {this.renderOverlay()}
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