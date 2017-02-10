import React from 'react';
import MapGL from 'react-map-gl';
import Dimensions from 'react-dimensions';
import HTMLOverlay from 'react-map-gl/dist/overlays/html.react.js';
import ViewportMercator from 'viewport-mercator-project';
import Tooltip from './tooltip'

const CONFIG = {
  'mapStyle': 'mapbox://styles/mapbox/dark-v9',
  'mapboxApiAccessToken': 'pk.eyJ1IjoibmFyZW5kcmFzaGV0dHkiLCJhIjoiY2l3am9veHJ2MDAwbDJ0cjI1NTkyM3llNSJ9.l2l38Z5jAyCO0_aOE-ABlA',
  'startDragLngLat': null,
  'isDragging': null
};

const Map = React.createClass({

  getInitialState() {
    return {
      'isLoading': true,
      'viewport': {},
      'pathTotalLength': 0,
      'showTooltip': false,
      'tooltipConfig': {}
    };
  },

  componentDidMount() {
    this.setup(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setup(nextProps);
  },

  setup(props) {
    let latitude = props.location[1];
    let longitude = props.location[0];
    let height = props.containerHeight;
    let width = props.containerWidth;
    this.setState({
      'viewport': {
        ...CONFIG,
        zoom: props.zoom,
        width,
        height,
        latitude,
        longitude,
      },
      'isLoading': false
    });
    
  },

  showTooltip(data, position) {
    this.setState({
      'showTooltip': true,
      'tooltipConfig': {
        data,
        position
      }
    });
  },

  renderLoading() {
    return (
      <div className="fullHeight map__loading">
        Loading
      </div>
    );
  },

  renderMarker(config, loc, index) {
    const locProject = config.project(loc.geometry.coordinates);
    return (
      <div
        key={index}
        className="marker"
        style={{
          'top': locProject[1] - 14,
          'left': locProject[0] - 10
        }}
        onClick={() => this.showTooltip(loc, locProject)}
      >
        <div className="marker__content">
        </div>
      </div>
    );
  },

  renderCluster(config, loc, index) {
    const locProject = config.project(loc.geometry.coordinates);

    return (
      <div
        key={index}
        className="marker marker--cluster"
        style={{
          'top': locProject[1] - 14,
          'left': locProject[0] - 10
        }}
      >
        <div className="marker__content"></div>
      </div>
    );
  },

  renderDots(config) {
    if (!this.props.Trucks.get('isLoading')) {
      const bounds = this.refs.map._map.getBounds();
      const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
      const points = this.props.Trucks.get('cluster').getClusters(bbox, this.state.viewport.zoom);

      return (
        <div>
          {points.map((loc, index) => {
            if (loc.type !== 'Feature') {
              return this.renderMarker(config, loc, index);
            }
          })}
        </div>
      );
    }
  },

  renderClusters(config) {
    if (!this.props.Trucks.get('isLoading')) {
      const bounds = this.refs.map._map.getBounds();
      const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
      const points = this.props.Trucks.get('cluster').getClusters(bbox, this.state.viewport.zoom);
      return (
        <div>
          {points.map((loc, index) => {
            if (loc.type === 'Feature') {
              return this.renderCluster(config, loc, index);
            }
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
          redraw={this.renderClusters}
          zoom={this.state.viewport.zoom}
          longitude={this.state.viewport.longitude}
          latitude={this.state.viewport.latitude}
        />
        <HTMLOverlay
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          isDragging={false}
          redraw={this.renderDots}
          zoom={this.state.viewport.zoom}
          longitude={this.state.viewport.longitude}
          latitude={this.state.viewport.latitude}
        />
        <Tooltip isVisible={this.state.showTooltip} config={this.state.tooltipConfig} />
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