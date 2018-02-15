import { PARK_SHOW } from '../actions/types';

const INITIAL_STATE = {
  selectedParkId: null,
};

export default function selectedParkReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PARK_SHOW:
      return {
        selectedParkId: action.payload.id,
      };
    default:
      return state;
  }
}
