import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import stores from "./stores";

const renderDevTools = () => {
  if (process.env.NODE_ENV !== "development") return null;

  return <DevTools position={{ top: 0, right: 0 }} />;
};

const Root = () => (
  <div>
    <Provider {...stores}>
      <App />
    </Provider>
    {renderDevTools()}
  </div>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
