import React, { Component } from 'react';
import { Icon,Modal ,InputItem} from 'antd-mobile';
import {connect} from "react-redux";
import {getAllUsersDispatch,submitSingleUserDispatch,USERMAGER_ISADD,delUserDispatch,modifyUserDispatch} from "../store/action/userMager"
import {delUserApi} from "../api/userMager";

const alert = Modal.alert;

class User extends Component {
  constructor(props){
    super(props)
    this.state={
      modal1:false,
      userid:"",
      username:"",
      moneyBase:"",
      newUsername:""
    }
  }
  render() {
    //let {userid,username,moneyBase,newUsername}=this.state;
    let {userList}=this.props;
    return (
      <div className="user">
        <header>
        <Icon type="left" size="md" onClick={this.back.bind(this)} />
        <p>用户管理</p>
        <Icon type="cross-circle" size="sm" onClick={this.showModal('modal1')} />
        </header>
        <main>
            <ul className="user-list">
            {
                userList && userList.map((item,key)=>{
                  return <li key={key} className="user-cont">
                              <span onClick={this.showAlert2.bind(this,item.userid)} className="qianbi">✎</span>
                              <span>{item.username}</span>
                              <span>{item.userid}</span>
                              <span onClick={this.showAlert.bind(this,item.userid)}>✖</span>
                          </li>
                })
            }
            </ul>
        </main>
        <div className="user-mk">
            <Modal
              visible={this.state.modal1}
              transparent
              maskClosable={false}
              onClose={this.onClose('modal1')}
              footer={[{ text:"确定", onPress: () => { this.onClose('modal1')();this.sureClick() } },{ text:"取消", onPress: () => {this.onClose('modal1')() } }]}
              wrapProps={{ onTouchStart: this.onWrapTouchStart }}
              
            >
              <div style={{ height: 160 }}>
              {/* 用户ID */}
              <InputItem
                placeholder="请输入用户id"
                ref={el => this.autoFocusInst = el}
                onChange={(value)=>{this.setState({userid:value})}}
              >用户id</InputItem>
              {/* 姓名 */}
              <InputItem
                placeholder="请输入用户姓名"
                ref={el => this.autoFocusInst = el}
                onChange={(value)=>{this.setState({username:value})}}
              >姓名</InputItem>
              {/* 金钱基数 */}
              <InputItem
                placeholder="请输入用户金钱"
                ref={el => this.autoFocusInst = el}
                onChange={(value)=>{this.setState({moneyBase:value})}}
              >金钱基数</InputItem>
              </div>
            </Modal>
        </div>
      </div>
    );
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  //修改的弹窗
  showAlert2(userid){
    alert('编辑用户', <InputItem placeholder="请输入新用户名" onChange={(value)=>{this.setState({newUsername:value})}}
  ></InputItem>, [
      { text: '确定', onPress: () => {this.modifyUser(userid,this.state.newUsername)}, style: 'default' },
      { text: '取消'},
    ]);
  }
  //删除的弹窗
  showAlert(userid){
    alert('警告', '确认删除?', [
      { text: '确定', onPress: () => {this.disUser(userid)}, style: 'default' },
      { text: '取消', onPress: () => console.log('取消') },
    ]);
  }
  //删除用户完成后
  disUser(userid){
    delUserApi(userid).then((res)=>{
      if(res.data.code===1){
          alert('提示', '删除成功', [
            { text: '确定', style: 'default' }
          ]);
          this.props.disUser(userid);
      }
    })
    
  }

  //修改完成后
  modifyUser(userid,newUsername){
    if(newUsername===""){
      alert('提示', '内容不能为空', [
           { text: '确定', style: 'default' }
         ]);
    }else{
       alert('提示', '修改成功', [
        { text: '确定', style: 'default' }
      ]);
      this.props.modifyUser(userid,newUsername);
    }
  }
  //添加用户的确定按钮股
  sureClick(){
    let {userid,username,moneyBase}=this.state;
    this.setState({userid:"",username:"",moneyBase:""})
    this.props.addUser({userid,username,moneyBase})
  }
  

  //返回
  back(){
    this.props.routerMsg.history.push("/money/home");
  }
  //获取已经的数据
  componentDidMount(){
    this.props.getAllUsers();
  }
  //添加完用户后的弹窗
  componentWillReceiveProps(nextProps){
    if(nextProps.isAdd===true){
       alert("提示","添加成功",[{text:"确定",onPress:()=>{this.props.resetIsAdd(null)}}]);
    }else if(nextProps.isAdd===false){
       alert("提示","添加失败",[{text:"确定"}]);
    }
  }
}

let mapState=(state)=>{
  let {userList,isAdd}=state.userMager;
  return {
      userList,isAdd
  }
}
let mapDispatch=(dispatch)=>{
  
  return {
      getAllUsers(){
         dispatch(getAllUsersDispatch);
      },
      addUser(data){
         dispatch(submitSingleUserDispatch(data));
      },
      resetIsAdd(isAdd){
        dispatch({type:USERMAGER_ISADD,isAdd});
      },
      disUser(userid){
        dispatch(delUserDispatch(userid));
      },
      modifyUser(userid,newUsername){
        dispatch(modifyUserDispatch(userid,newUsername));
      }
  }
}

User=connect(mapState,mapDispatch)(User)

export default User;