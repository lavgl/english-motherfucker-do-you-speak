import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import counterStore from "./stores/counter.store";

const stores = { counterStore };

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
registerServiceWorker();
