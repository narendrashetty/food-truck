// import { fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DATA_SUCCESS:
      return action.data;
  }
  return state;
}