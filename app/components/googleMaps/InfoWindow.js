import React from 'react';
import { connect } from 'react-redux';
import { closeInfoWindow } from '../../actions/';

const propTypes = {
  content: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  mapRef: React.PropTypes.object.isRequired,
  pin: React.PropTypes.object,
  open: React.PropTypes.bool.isRequired,
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
