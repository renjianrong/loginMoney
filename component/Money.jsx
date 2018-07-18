import React, { Component } from 'react';
import {BrowserRouter as Router,Route,NavLink,Switch,Redirect} from "react-router-dom";
import { Icon } from 'antd-mobile';
class Money extends Component {
  render() {
    let {routerMsg,children}=this.props;
    return <Router>
        <div className="money">
              <header>
                  
              </header>
              <main>
                  <Switch>
                      {
                        children.map((item,key)=>{
                            return <Route key={key} path={`${routerMsg.match.url}${item.path}`} render={(routerMsg)=>{
                                let Cont=item.render;
                                return <Cont routerMsg={routerMsg} />
                            }}></Route>
                        })
                      }
                      <Redirect from="/money" to="/money/home" />
                  </Switch>
              </main>
              <footer>
                  {
                    children.map((item,key)=>{
                        return <NavLink key={key} to={`${routerMsg.match.url}${item.path}`}>
                             <Icon type="check-circle-o" size="xs" />
                             <span>{item.cont}</span>
                        </NavLink>
                    })
                  }
              </footer>
        </div>
    </Router>
  }
}

export default Money;