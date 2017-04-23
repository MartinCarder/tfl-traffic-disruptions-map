import { combineReducers } from 'redux';

import {
  FETCH_TRAFFIC_REQUEST,
  FETCH_TRAFFIC_FAILURE,
  FETCH_TRAFFIC_SUCCESS,
  CLOSE_INFO_WINDOW,
  OPEN_INFO_WINDOW,
} from '../actions/';

const trafficData = (state = {
  isFetching: false,
  isError: false,
  data: [],
}, action) => {
  switch (action.type) {
    case FETCH_TRAFFIC_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isError: false,
      });

    case FETCH_TRAFFIC_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
      });

    case FETCH_TRAFFIC_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isError: false,
        data: action.data,
      });

    default:
      return state;
  }
};

const infoWindow = (state = {
  open: false,
  pin: undefined,
  content: '',
}, action) => {
  switch (action.type) {

    case CLOSE_INFO_WINDOW:
      return Object.assign({}, state, {
        open: false,
        pin: undefined,
        content: '',
      });

    case OPEN_INFO_WINDOW:
      return Object.assign({}, state, {
        open: true,
        pin: action.data.pin,
        content: action.data.content,
      });

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  trafficData,
  infoWindow,
});

export default rootReducer;
