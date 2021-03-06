import React, { Component } from 'react';
import Index from "./component/Index";
import {Provider} from "react-redux";
import store from "./store/index";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}><Index /></Provider>
      </div>
    );
  }
}

export default App;
