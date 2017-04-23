import React from 'react';

const propTypes = {
  mapRef: React.PropTypes.object,
  lat: React.PropTypes.string.isRequired,
  lng: React.PropTypes.string.isRequired,
};

class MapPin extends React.Component {
  componentDidMount() {
    this.addPin();
  }

  addPin() {
    const { mapRef, lng, lat } = this.props;
    this.marker = new window.google.maps.Marker({
      position: { lat, lng },
      map: mapRef,
    });
  }

  render() {
    return null;
  }
}

MapPin.propTypes = propTypes;

export default MapPin;
