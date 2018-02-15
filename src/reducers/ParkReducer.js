//import data from '../../data/parks.json';
import { PARKS_CHANGED } from '../actions/types';

const INITIAL_STATE = data.parks;

export default function parkReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PARKS_CHANGED:
      return action.payload.parks;
    default:
      return state;
  }
}
