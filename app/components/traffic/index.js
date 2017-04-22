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
    console.log(this.props)
    return (
      <div>
        <GoogleMaps />
      </div>
    );
  }
}

Traffic.propTypes = propTypes;

export default connect()(Traffic);
