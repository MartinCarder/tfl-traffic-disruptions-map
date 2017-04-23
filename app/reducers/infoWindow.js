import {
  CLOSE_INFO_WINDOW,
  OPEN_INFO_WINDOW,
} from '../actions/';

const infoWindow = (state = {
  content: '',
  open: false,
  pin: undefined,
}, action) => {
  switch (action.type) {

    case CLOSE_INFO_WINDOW:
      return Object.assign({}, state, {
        content: '',
        open: false,
        pin: undefined,
      });

    case OPEN_INFO_WINDOW:
      return Object.assign({}, state, {
        content: action.data.content,
        open: true,
        pin: action.data.pin,
      });

    default:
      return state;
  }
};

export default infoWindow;
