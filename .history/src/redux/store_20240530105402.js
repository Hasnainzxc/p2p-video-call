// src/redux/store.js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // Assuming you have an index.js in the reducers folder

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
