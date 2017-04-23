import { combineReducers } from 'redux';
import infoWindow from './infoWindow';
import trafficData from './trafficData';

const rootReducer = combineReducers({
  trafficData,
  infoWindow,
});

export default rootReducer;
