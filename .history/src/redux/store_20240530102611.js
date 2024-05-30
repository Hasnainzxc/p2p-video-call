// src/redux/store.js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // Ensure you have your root reducer set up

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
