import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';

import InfoWindow from './InfoWindow';

let mapLoaded;

const propTypes = {
  children: PropTypes.node.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  mapKey: PropTypes.string.isRequired,
  zoom: PropTypes.number.isRequired,
};

class GoogleMaps extends React.Component {
  constructor() {
    super();

    this.state = {
      mapReady: false,
    };
  }

  componentDidMount() {
    const { lat, lng, mapKey, zoom } = this.props;

    if (!mapLoaded) {
      mapLoaded = new Promise((resolve) => {
        const scriptTag = document.createElement('script');
        scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&callback=initMap`;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);

        window.initMap = () => resolve(window.google);
      });
    }

    mapLoaded.then((maps) => {
      this.map = new maps.maps.Map(this.mapRef, {
        center: { lat, lng },
        zoom,
      });

      this.setState({ mapReady: true });
    });
  }

  buildPins() {
    const { children } = this.props;
    let markup = null;

    if (children && this.state.mapReady) {
      markup = React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          mapRef: this.map,
        });
      });
    }

    return markup;
  }

  render() {
    return (
      <div className={styles.map} ref={(ref) => { this.mapRef = ref; }}>
        {this.buildPins()}
        {
          this.state.mapReady &&
          <InfoWindow mapRef={this.map} />
        }
      </div>
    );
  }
}

GoogleMaps.propTypes = propTypes;

export default GoogleMaps;
