import React, { Component } from 'react';
import {connect} from "react-redux";

class Computed extends Component {
  render() {
    let {userList,allNum}=this.props;
    return (
      <div className="computed">
        <div className="computed-allNum">
           <span>{allNum}</span>
        </div>
        <div className="computed-table">
           <div className="table-top">
               <span>姓名</span>
               <span>个人总计</span>
               <span>平均金额</span>
               <span>应付</span>
               <span>应收</span>
           </div>
           {
             userList&&userList.map((item,key)=>{
               let averageVal=(allNum/userList.length).toFixed(2);
               let shou=item.moneyBase>averageVal?item.moneyBase-averageVal:0;
               let fuqian=item.moneyBase>averageVal?0:averageVal-item.moneyBase;
               return <div key={key} className="table-bot">
                          <span>{item.username}</span>
                          <span>{item.moneyBase}</span>
                          <span>{averageVal}</span>
                          <span>{fuqian}</span>
                          <span>{shou}</span>
                      </div>
             })
           }
        </div>
      </div>
    );
  }
}
let mapState=(state)=>{
  let {userList,allNum}=state.userMager;
  return{
      userList,allNum
  }
}
let mapDispatch=(dispatch)=>{
  return {

  }
}

Computed=connect(mapState,mapDispatch)(Computed)
export default Computed;