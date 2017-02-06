import React from 'react';
import MapGL from 'react-map-gl';
import Dimensions from 'react-dimensions';
import HTMLOverlay from 'react-map-gl/dist/overlays/html.react.js';
import ViewportMercator from 'viewport-mercator-project';
import Cluster from '../utils/cluster';

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
      'isLoading': false,
      'cluster': Cluster()
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
    var cluster = Cluster().load(this.props.Trucks.map((obj, i) => {
      const xy = config.project(obj.location.coordinates);
      return {
        x: xy[0],
        y: xy[1],
        zoom: Infinity, // the last zoom the cluster was processed at

        // point id: index of the source feature in the original input array
        // cluster id: index of the first child of the cluster in the zoom level tree
        id: i,

        parentId: -1, // parent cluster id
        numPoints: 1
      };
    }) || []);





    const sourceProject = config.project([-122.442066, 37.755779]);

    var xstart = sourceProject[0] - (config.width / 2);
    var xend = sourceProject[0] + (config.width / 2) - 10;
    var ystart = sourceProject[1] - (config.height / 2);
    var yend = sourceProject[1] + (config.height / 2) - 10;

    var a = config.unproject([0,sourceProject[1]]);
    var b = config.unproject([xend, sourceProject[1]]);

    var c = config.unproject([sourceProject[1], 0]);
    var d = config.unproject([sourceProject[1], yend]);  
    
    console.log(cluster.getClusters([a[0], d[1], b[0], c[1]], this.state.viewport.zoom));
    return (
        <div className="marker" style={{
          'top': yend,
          'left': sourceProject[0],
          'position': 'absolute',
          'background': '#000',
          'width': '10px',
          'height': '10px'
        }}>
        </div>
    );
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