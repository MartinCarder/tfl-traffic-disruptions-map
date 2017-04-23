import React from 'react';
import { connect } from 'react-redux';
import { fetchTraffic, openInfoWindow } from '../../actions/';

import GoogleMaps from './GoogleMaps';
import MapPin from './MapPin';

const propTypes = {
  data: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

class Traffic extends React.Component {

  componentDidMount() {
    this.pinCallback = this.pinCallback.bind(this);
    const { dispatch } = this.props;
    dispatch(fetchTraffic());
  }

  pinCallback(pin, content, mapRef) {
    const { dispatch } = this.props;
    dispatch(openInfoWindow({ pin, content, mapRef }));
  }

  render() {
    return (
      <div>
        <GoogleMaps>
          {
            this.props.data.map((item) => {
              const cordinates = item.CauseArea.DisplayPoint.Point.coordinatesLL.split(',');
              const id = item.$.id;
              const info = `<div class="map-content">
                <h1 class="map-header">${item.severity}</h1>
                <p>${item.comments}</p>
                <p>${item.currentUpdate}</p>
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
          }
        </GoogleMaps>
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
