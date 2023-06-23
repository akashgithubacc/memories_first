import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/index";
import "./index.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const store = configureStore({
  reducer: reducer,
  middleware: [thunk],
  devTools: false,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
