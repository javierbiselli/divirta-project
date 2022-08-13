import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { salonsReducer } from './salons/reducer';
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    salons: salonsReducer,
  });

const configureStore = () => {
    const enhancer = composeWithDevTools(applyMiddleware(thunk));
    return createStore(rootReducer, enhancer);
  };

const store = configureStore();

export default store;