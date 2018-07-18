import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom";
import config from "../router/routerConfig";
class Index extends Component {
  render() {
    return <Router>
      <div className="index">
      
          <Switch>
              {
                config.map((item,key)=>{
                  return <Route key={key} path={item.path} render={(routerMsg)=>{
                      let Con=item.render;
                      return <Con routerMsg={routerMsg} children={item.children}/>
                  }}>

                  </Route>
                })
              }      
              <Redirect from="/" to="/money" />
          </Switch>
      </div>
    </Router>
  }
}

export default Index;