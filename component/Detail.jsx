import React, { Component } from 'react';
import {connect} from "react-redux";

import {detailListDispatch} from "../store/action/userMager";
class Detail extends Component {
  constructor(props){
    super(props);
    this.state={
      userid:""
    }
  }
  render() {
    let {detailList}=this.props;
    return (
      <div className="detail">
        <div className="detail-xuan">
           <p>请选择一名用户</p>
           {
                 detailList.map((item,key)=>{
                    return <div className="detail-list" key={key}>
                                <p>{item.newUser}</p>
                                <div className="list-one">
                                    <p><span>{item.newDate}</span><span>{item.newMoney}</span><span>{item.remarks}</span></p>
                                </div>
                            </div>
                })
           }
        </div>
      </div>
    );
  }
  componentDidMount(){
    let newid=this.props.routerMsg.location.state.userid;
    this.setState({userid:newid});
    this.props.getDetailList(newid);
  }
}
 
let mapState=(state)=>{
  let {submiList,detailList}=state.userMager;
  return {
    submiList,detailList
  }
}
let mapDispatch=(dispatch)=>{
  return {
      getDetailList(id){
        dispatch(detailListDispatch(id))
      }
  }
}
Detail=connect(mapState,mapDispatch)(Detail);
export default Detail;