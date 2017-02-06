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
      action.data = action.data.map((loc) => {
        return {
          'facilitytype': loc.facilitytype,
          'geometry': loc.location,
          'locationdescription': loc.locationdescription,
          'address': loc.address,
          'applicant': loc.applicant,
          'fooditems': loc.fooditems
        }
      });

      state = state.merge({
        'isLoading': false,
        'data': action.data
      });

      return state.set('cluster', Cluster().load(action.data));

    case types.COMPUTE_VISIBLE:
      return state.merge({
        'dataVisible': state.get('data').filter((loc) => {
          // 0 is less than east && 1 is greater than east
          // 0 is less than north && 1 is greater than north
          // 0 is greater 
          
        })
      });
  }
  return state;
}