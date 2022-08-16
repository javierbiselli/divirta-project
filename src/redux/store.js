import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { salonsReducer } from './salons/reducer';
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./auth/reducer";
import { usersReducer } from "./users/reducer";

const rootReducer = combineReducers({
    salons: salonsReducer,
    auth: authReducer,
    users: usersReducer,
  });

const configureStore = () => {
    const enhancer = composeWithDevTools(applyMiddleware(thunk));
    return createStore(rootReducer, enhancer);
  };

const store = configureStore();

export default store;