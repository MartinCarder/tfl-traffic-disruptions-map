import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeInfoWindow } from '../../actions/';

const propTypes = {
  content: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  mapRef: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  pin: PropTypes.object,
};

const defaultProps = {
  pin: {},
};

class InfoWindow extends React.Component {
  componentDidMount() {
    this.closeEvent = this.closeEvent.bind(this);
    this.infoWindow = new window.google.maps.InfoWindow({
      content: '',
    });

    window.google.maps.event.addListener(this.infoWindow, 'closeclick', this.closeEvent);
  }

  componentDidUpdate(prevProps) {
    const { content, open } = this.props;
    if (open !== prevProps.open || content !== prevProps.content) {
      this.updateWindow();
    }
  }

  closeEvent() {
    const { dispatch } = this.props;
    dispatch(closeInfoWindow());
  }

  updateWindow() {
    const { content, mapRef, pin, open } = this.props;
    this.infoWindow.setContent(content);

    if (open) {
      this.infoWindow.open(mapRef, pin);
    } else {
      this.infoWindow.close();
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  const { infoWindow } = state;
  const {
    content,
    open,
    pin,
  } = infoWindow;

  return {
    content,
    open,
    pin,
  };
};

InfoWindow.propTypes = propTypes;
InfoWindow.defaultProps = defaultProps;

export default connect(mapStateToProps)(InfoWindow);
