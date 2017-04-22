import { combineReducers } from 'redux';

import {
  FETCH_TRAFFIC_REQUEST,
  FETCH_TRAFFIC_FAILURE,
  FETCH_TRAFFIC_SUCCESS,
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

const rootReducer = combineReducers({
  trafficData,
});

export default rootReducer;
