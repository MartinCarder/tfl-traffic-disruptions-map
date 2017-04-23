import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  mapRef: PropTypes.object,
  pinCallback: PropTypes.func.isRequired,
  popupMarkup: PropTypes.string.isRequired,
};

const defaultProps = {
  mapRef: {},
};

class MapPin extends React.Component {
  componentDidMount() {
    this.pinClick = this.pinClick.bind(this);
    this.addPin();
  }

  componentDidUpdate(prevProps) {
    const { lng, lat } = this.props;
    if (lng !== prevProps.lng || lat !== prevProps.lat) {
      const latlng = new window.google.maps.LatLng(lat, lng);
      this.marker.setPosition(latlng);
    }
  }

  componentWillUnmount() {
    this.marker.removeListener('click', this.pinClick);
    this.marker.setMap(null);
    this.marker = null;
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
MapPin.defaultProps = defaultProps;

export default MapPin;
