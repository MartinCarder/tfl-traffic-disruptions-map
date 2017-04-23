import React from 'react';
import { connect } from 'react-redux';
import { fetchTraffic, openInfoWindow } from '../../actions/';

import GoogleMaps from './GoogleMaps';
import Loading from './Loading';
import MapPin from './MapPin';

const propTypes = {
  data: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  isError: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
};

class Traffic extends React.Component {

  componentDidMount() {
    this.pinCallback = this.pinCallback.bind(this);
    const { dispatch } = this.props;
    dispatch(fetchTraffic());
  }

  pinCallback(pin, content) {
    const { dispatch } = this.props;
    dispatch(openInfoWindow({ pin, content }));
  }

  buildPins() {
    return (
      this.props.data.map((item) => {
        const cordinates = item.CauseArea.DisplayPoint.Point.coordinatesLL
          ? item.CauseArea.DisplayPoint.Point.coordinatesLL.split(',') : [];

        const id = item.$.id;
        const currentUpdate = item.currentUpdate ? `<p>${item.currentUpdate}</p>` : '';

        const info = `<div class="map-content">
          <h1 class="map-header">${item.severity}</h1>
          <p>${item.comments}</p>
          ${currentUpdate}
        </div>`;

        return (
          <MapPin
            key={id}
            lat={parseFloat(cordinates[1])}
            lng={parseFloat(cordinates[0])}
            popupMarkup={info}
            pinCallback={this.pinCallback}
          />
        );
      },
      )
    );
  }

  render() {
    const { isFetching, isError } = this.props;

    return (
      <div>
        <GoogleMaps
          mapKey="AIzaSyBczGXeXKsuc0IrHbcfVjkJYuEsPRdbxyM"
          lng={-0.118092}
          lat={51.509865}
          zoom={11}
        >
          { this.buildPins() }
        </GoogleMaps>
        <Loading isFetching={isFetching} isError={isError} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { trafficData } = state;
  const {
    isFetching,
    isError,
    data,
  } = trafficData;

  return {
    isFetching,
    isError,
    data,
  };
};

Traffic.propTypes = propTypes;

export default connect(mapStateToProps)(Traffic);
