import { parseString } from 'xml2js';

export const FETCH_TRAFFIC = 'FETCH_TRAFFIC';
export const FETCH_TRAFFIC_REQUEST = 'FETCH_TRAFFIC_REQUEST';
export const FETCH_TRAFFIC_FAILURE = 'FETCH_TRAFFIC_FAILURE';
export const FETCH_TRAFFIC_SUCCESS = 'FETCH_TRAFFIC_SUCCESS';
export const CLOSE_INFO_WINDOW = 'CLOSE_INFO_WINDOW';
export const OPEN_INFO_WINDOW = 'OPEN_INFO_WINDOW';

export const fetchTrafficRequest = () => {
  return {
    type: FETCH_TRAFFIC_REQUEST,
  };
};

export const fetchTrafficSuccess = (data) => {
  return {
    type: FETCH_TRAFFIC_SUCCESS,
    data,
  };
};

export const fetchTrafficFailure = (message) => {
  return {
    type: FETCH_TRAFFIC_FAILURE,
    message,
  };
};


export const fetchTraffic = () => {
  return (dispatch) => {
    dispatch(fetchTrafficRequest());
    return fetch('https://data.tfl.gov.uk/tfl/syndication/feeds/tims_feed.xml?app_id=&app_key=')
      .then(response => response.text())
      .then((data) => {
        parseString(data, { explicitArray: false }, (err, result) => {
          const disruptions = result.Root.Disruptions.Disruption;
          dispatch(fetchTrafficSuccess(disruptions));
        });
      })
      .catch(() => {
        dispatch(fetchTrafficFailure());
      });
  };
};

export const closeInfoWindow = (data) => {
  return {
    type: CLOSE_INFO_WINDOW,
    data,
  };
};

export const openInfoWindow = (data) => {
  return {
    type: OPEN_INFO_WINDOW,
    data,
  };
};
