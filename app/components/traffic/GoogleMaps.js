import React from 'react';
import styles from './googleMaps.scss';

import InfoWindow from './InfoWindow';

let mapLoaded;

const propTypes = {
  children: React.PropTypes.node.isRequired,
};

class GoogleMaps extends React.Component {
  constructor() {
    super();

    this.state = {
      mapReady: false,
    };
  }

  componentDidMount() {
    if (!mapLoaded) {
      mapLoaded = new Promise((resolve) => {
        const scriptTag = document.createElement('script');
        scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBczGXeXKsuc0IrHbcfVjkJYuEsPRdbxyM&callback=initMap';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
        window.initMap = () => resolve(window.google);
      });
    }

    mapLoaded.then((maps) => {
      this.map = new maps.maps.Map(this.mapRef, {
        center: { lat: 51.509865, lng: -0.118092 },
        zoom: 11,
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
          <InfoWindow />
        }
      </div>
    );
  }
}

GoogleMaps.propTypes = propTypes;

export default GoogleMaps;
