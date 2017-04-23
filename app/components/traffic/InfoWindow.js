import React from 'react';
import { connect } from 'react-redux';

const propTypes = {
  content: React.PropTypes.string.isRequired,
  mapRef: React.PropTypes.object,
  pin: React.PropTypes.object,
  open: React.PropTypes.bool.isRequired,
};

class InfoWindow extends React.Component {
  componentDidMount() {
    this.infoWindow = new window.google.maps.InfoWindow({
      content: '',
    });
  }

  componentDidUpdate(prevProps) {
    const { content, open } = this.props;
    if (open !== prevProps.open || content !== prevProps.content) {
      this.updateWindow();
    }
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
    mapRef,
    open,
    pin,
  } = infoWindow;

  return {
    content,
    mapRef,
    open,
    pin,
  };
};

InfoWindow.propTypes = propTypes;

export default connect(mapStateToProps)(InfoWindow);
