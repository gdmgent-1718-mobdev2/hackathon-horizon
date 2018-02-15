import { combineReducers } from 'redux';

import parkReducer from './ParkReducer';
import navigationReducer from './NavigationReducer';
import selectedParkReducer from './SelectedParkReducer';

export default combineReducers({
  parks: parkReducer,
  nav: navigationReducer,
  detail: selectedParkReducer,
});
