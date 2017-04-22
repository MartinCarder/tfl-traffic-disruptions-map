import React from 'react';
import styles from './googleMaps.scss';

let mapLoaded;

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

      this.setState({ mapReady: false });
    });
  }
  render() {
    return (
      <div className={styles.map} ref={(ref) => { this.mapRef = ref; }} />
    );
  }
}

export default GoogleMaps;
