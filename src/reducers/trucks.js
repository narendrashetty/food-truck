import { fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';
import Cluster from '../utils/cluster';

const initialState = fromJS({
  'isLoading': 'false',
  'data': [],
  'dataVisible': []
});

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DATA_INIT:
      return state.merge({
        'isLoading': true
      });
    case types.FETCH_DATA_SUCCESS:
      var facilitytype = {};
      action.data = action.data.map((loc) => {
        facilitytype[loc.facilitytype] ? facilitytype[loc.facilitytype]++ : facilitytype[loc.facilitytype] = 1;
        return {
          'facilitytype': loc.facilitytype,
          'geometry': loc.location,
          'locationdescription': loc.locationdescription,
          'address': loc.address,
          'applicant': loc.applicant,
          'fooditems': loc.fooditems
        }
      });
      console.log(facilitytype);

      state = state.merge({
        'isLoading': false,
        'data': action.data
      });

      return state.set('cluster', Cluster().load(action.data));
  }
  return state;
}