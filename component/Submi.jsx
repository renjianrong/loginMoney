import React, { Component } from 'react';
import { DatePicker, List ,Picker,InputItem,Button,Modal} from 'antd-mobile';
import {connect} from "react-redux";

import {subAddUserDispatch,getAllUsersDispatch} from "../store/action/userMager"


const alert = Modal.alert;

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
if (minDate.getDate() !== maxDate.getDate()) {
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

// function formatDate(date) {
//   /* eslint no-confusing-arrow: 0 */
//   const pad = n => n < 10 ? `0${n}` : n;
//   const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
//   const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
//   return `${dateStr} ${timeStr}`;
// }

class Submi extends Component {
  constructor(props){
    super(props)
    this.state={
        date: now,
        time: now,
        utcDate: utcNow,
        dpValue: null,
        customChildValue: null,
        visible: false,
        sValue:["请选择"],
        seasons:[
          [
            {
              label: '请选择',
              value: '请选择',
            }
          ],
        ],
        newMoney:"",
        remarks:""
    }
  }
  render() {
    return <div className="submi">
        {/* 时间 */}
        <DatePicker
          mode="date"
          extra="Optional"
          value={this.state.date}
          onChange={date =>{ this.setState({ date})}}
        >
          <List.Item arrow="horizontal">时间</List.Item>
        </DatePicker>
        {/* 姓名 */}
        <Picker
          data={this.state.seasons}
          cascade={false}
          extra="请选择(可选)"
          value={this.state.sValue}
          onChange={v => this.setState({ sValue: v })}
          onOk={v => this.setState({ sValue: v })}
        >
          <List.Item arrow="horizontal">姓名</List.Item>
        </Picker>
        {/* 金额 */}
        <InputItem
            clear
            placeholder="请输入金额"
            ref={el => this.autoFocusInst = el}
            onChange={(value)=>{this.setState({newMoney:value})}}
          >金额</InputItem>
          {/* 用途备注 */}
          <InputItem
            clear
            placeholder="请输入备注"
            ref={el => this.autoFocusInst = el}
            onChange={(value)=>{this.setState({remarks:value})}}
          >用途备注</InputItem>
          <div className="submi-btns">
              <Button onClick={this.submit.bind(this)} type="primary" style={{ marginRight: '4px' }} inline size="small">提交</Button>
              <Button type="warning" inline size="small">清空</Button>
          </div>
      </div>
  }
  submit(){
    let {date,sValue,newMoney,remarks}=this.state;
    //备注事情的添加
    let purpose={
      newDate:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
      newUser:sValue.toString(),
      newMoney:newMoney,
      remarks:remarks
    }
    console.log(purpose);
    alert('请确定', <div><p>{purpose.newDate}</p><p>{purpose.newUser}</p><p>{purpose.newMoney}</p><p>{purpose.remarks}</p></div>, [
        { text: '确定', onPress: () => {this.success(purpose)}, style: 'default' },
        { text: '取消' ,onPress: () => {this.error()}},
      ]);
  }
  success(purpose){
    let index=this.props.userList.findIndex(item=>item.username===purpose.newUser);
    let newid=this.props.userList[index].userid;
    this.props.subAddUser(purpose,newid);
    alert('提示', "添加成功", [
      { text: '确定', onPress: () => {console.log("添加成功")}, style: 'default' },
    ]);
  }
  error(){
    alert('提示', "添加失败", [
      { text: '确定', onPress: () => {console.log("添加失败")}, style: 'default' },
    ]);
  }

  componentDidMount(){
    this.props.getAllUsers();
    this.props.userList.forEach((item)=>{
      this.state.seasons.forEach((item2)=>{
        item2.push({
          label: item.username,
          value: item.username
        })
      })
    })
  }
}
let mapState=(state)=>{
    let {userList}=state.userMager;
    return {
       userList
    }
}

let mapDispatch=(dispatch)=>{
    return {
      subAddUser(purpose,newid){
         dispatch(subAddUserDispatch(purpose,newid));
      },
      getAllUsers(){
        dispatch(getAllUsersDispatch);
      }
    }
}
Submi=connect(mapState,mapDispatch)(Submi)

export default Submi;