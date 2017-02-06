import * as types from '../constants/ActionTypes';
import Api from '../api';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Handlers = {
  'fetchData': {

    init() {
      return {
        'type': types.FETCH_DATA_INIT
      };
    },

    success(data) {
      return {
        'type': types.FETCH_DATA_SUCCESS,
        data
      };
    }
  }
};

export default {
  fetchData() {
    const handler = Handlers.fetchData;
    return (dispatch) => {
      dispatch(handler.init());
      return Api.fetchData()
        .then(checkStatus)
        .then(parseJSON)
        .then((json) => {
          return dispatch(handler.success(json));
        });
    };
  },

  computeVisible(data) {
    return {
      'type': types.COMPUTE_VISIBLE,
      data
    };
  }
};