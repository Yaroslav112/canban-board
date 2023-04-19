import logger from "redux-logger";
import { issuesReducer } from "./reducers/issuesReducer";
import { applyMiddleware, createStore } from "redux";

export const store = createStore(
    issuesReducer,
    applyMiddleware(logger)
)
