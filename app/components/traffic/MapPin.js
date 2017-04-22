import React from 'react';

const propTypes = {
  map: React.PropTypes.object.isRequired,
  lat: React.PropTypes.number.isRequired,
  lng: React.PropTypes.number.isRequired,
};

class MapPin extends React.Component {
  componentDidMount() {
    this.addPin();
  }

  addPin() {
    const { map, lng, lat } = this.props;
    this.marker = new window.google.maps.Marker({
      position: { lat, lng },
      map,
    });
  }

  render() {
    return null;
  }
}

MapPin.propTypes = propTypes;

export default MapPin;
