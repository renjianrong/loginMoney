import React, { Component } from 'react';
import { List, InputItem } from 'antd-mobile';
import {connect} from "react-redux";

import {getAllUsersDispatch} from "../store/action/userMager";

const Item=List.Item;

class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      inputShow:false,
      inputVal:""
    }
  }
  render() {
    let {inputShow}=this.state;
    let {userList,allNum}=this.props;
    return (
      <div className="home">
        <div className="home-top">
           <span>{allNum}</span>
           <p>嗨，402的帅哥美女</p>
        </div>
        <div className="inputTab" style={{display:inputShow?"none":"block"}}>
            <InputItem
                type="password"
                clear
                placeholder="请输入管理员密码"
                onChange={(value)=>{this.setState({inputVal:value})}}
                onBlur={this.tabInput.bind(this)}
            ></InputItem>
        </div>
        {/* input 与 用户管理 */}
        <div className="boxTab" style={{display:inputShow?"block":"none"}} onClick={this.pushUser.bind(this)}>用户管理</div>
        <div className="move">
            <p className="home-money">
              {/* {
                userList.length===0?<span>暂无数据</span>:<p><span>{userList[userList.length-1].username}</span><span>提交了</span><span>{userList[userList.length-1].moneyBase}</span></p>
              } */}
            </p>
        </div>
        <div className="home-list">
            {
               userList.map((item,key)=>{
                  return <List key={key} onClick={this.clickDetail.bind(this,item.userid)}>
                  <Item extra={item.moneyBase}>{item.username}</Item>
                </List>
               })
            }
        </div>
      </div>
    );
  } 
  componentDidMount(){
    this.props.getAllUsers();
  }
  //点击跳转详情
  clickDetail(userid){
    this.props.routerMsg.history.push("/money/detail",{userid:userid});
  }
  //切换
  tabInput(){
    if(this.state.inputVal==="123"){
       this.setState({inputShow:true})
    }
  }
  //前往user
  pushUser(){
    window.location.href="/user";
  }
}
let mapState=(state)=>{
  let {userList,allNum}=state.userMager;
  return {
    userList,allNum
  }
}
let mapDispatch=(dispatch)=>{
  return {
      getAllUsers(){
          dispatch(getAllUsersDispatch);
      }
  }
}


Home=connect(mapState,mapDispatch)(Home)
export default Home;