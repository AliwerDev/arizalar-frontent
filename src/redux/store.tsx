import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer, { IRootState } from "./reducers";

const store = createStore<IRootState, any, any, any>(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const dispatch = store.dispatch;

export { store, dispatch };
