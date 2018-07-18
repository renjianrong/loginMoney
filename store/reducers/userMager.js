import {USERMAGER_ADD_USER,USERMAGER_INIT_USER,USERMAGER_ISADD,USERMAGER_DEL_USER,USERMAGER_MODIFY_USER,SUBMI_ADD,DETAIL_LIST} from "../action/userMager";

let typeFn={
    //添加用户
     [USERMAGER_ADD_USER](state,action){
         state.userList.push(action.userinfo);
     },
     //获取已有用户信息
     [USERMAGER_INIT_USER](state,action){
         state.userList=action.users;
     },
     [USERMAGER_ISADD](state,action){
        state.isAdd=action.isAdd;
     },
     //删除用户
     [USERMAGER_DEL_USER](state,action){
        console.log(action.userid)
        let userid=action.userid;
        let index=state.userList.findIndex(item=>userid===item.userid);
        state.userList.splice(index,1);
     },
     //修改用户名
     [USERMAGER_MODIFY_USER](state,action){
        let userid=action.userid;
        let index=state.userList.findIndex(item=>userid===item.userid);
        state.userList[index].username=action.newUsername;
     },

     //提交页面的添加数据
     [SUBMI_ADD](state,action){
         let index=state.userList.findIndex(item=>action.purpose.newUser===item.username);
         //修改原始数据中的金额
         state.userList[index].moneyBase=state.userList[index].moneyBase*1+action.purpose.newMoney*1;

         //计算总价
         let allNum=0;
         state.userList.forEach((item)=>{
            allNum+=item.moneyBase*1;
         })
         state.allNum=allNum;

         //存储新数组中的数据（判断依旧是id）
         if(state.submiList.length===0){
            state.submiList.push({[action.newid]:[action.purpose]});
         }else{
            state.submiList.forEach((item)=>{
               for(let key in item){
                  if(key===action.newid){
                      item[key].push(action.purpose);
                  }else{
                      state.submiList.push({[action.newid]:[action.purpose]});
                  }
               }
            })
         }
     },

     //详情的数据
     [DETAIL_LIST](state,action){
        state.submiList.forEach((item,index)=>{
            for(let key in item){
                if(key == action.id){
                    item[key].forEach((con)=>{
                        state.detailList.push(con);
                    })
                    
                }
            }
        })
     }
}

export let userMager=(state={userList:[],submiList:[],detailList:[],isAdd:null,allNum:0},action)=>{
    typeFn[action.type]&&typeFn[action.type](state,action);
    return {...state,userList:[...state.userList],submiList:[...state.submiList],detailList:[...state.detailList]};
}