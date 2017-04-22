import React from 'react';
import { connect } from 'react-redux';
import { fetchTraffic } from '../../actions/';

import GoogleMaps from './GoogleMaps';

const propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

class Traffic extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTraffic());
  }

  render() {
    return (
      <div>
        <GoogleMaps />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { trafficData } = state
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
