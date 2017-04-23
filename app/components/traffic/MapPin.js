import React from 'react';

const propTypes = {
  mapRef: React.PropTypes.object,
  lat: React.PropTypes.number.isRequired,
  lng: React.PropTypes.number.isRequired,
};

class MapPin extends React.Component {
  componentDidMount() {
    this.pinClick = this.pinClick.bind(this);
    this.addPin();
  }

  addPin() {
    const { mapRef, lng, lat } = this.props;
    this.marker = new window.google.maps.Marker({
      position: { lat, lng },
      map: mapRef,
    });

    this.marker.addListener('click', this.pinClick);
  }

  pinClick() {
    const { pinCallback, popupMarkup, mapRef } = this.props;
    pinCallback(this.marker, popupMarkup, mapRef);
  }

  render() {
    return null;
  }
}

MapPin.propTypes = propTypes;

export default MapPin;
