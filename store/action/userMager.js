//import {getInitNumApi} from "../../api/registerApp"
import {getAllUsers,submitSingleUser,delUserApi,modifyUserApi,submiAddUserApi,detailLstApi} from "../../api/userMager";

export const USERMAGER_ADD_USER="USERMAGER_ADD_USER";
export const USERMAGER_INIT_USER="USERMAGER_INIT_USER";
export const USERMAGER_ISADD="USERMAGER_ISADD";
export const USERMAGER_DEL_USER="USERMAGER_DEL_USER";
export const USERMAGER_MODIFY_USER="USERMAGER_MODIFY_USER";
export const DETAIL_LIST="DETAIL_LIST";


//提交页面
export const SUBMI_ADD="SUBMI_ADD";

//总价
// export const COMPUT_ALLNUM="COMPUT_ALLNUM";
// export let computAllNumDispatch=(allNum)=>{
//      return (dispatch)=>{
//         computAllNumApi(allNum).then((res)=>{
//             dispatch({type:COMPUT_ALLNUM,allNum})
//         })
//      }
// }

//详情
export let detailListDispatch=(id)=>{
    return (dispatch)=>{
        detailLstApi(id).then((res)=>{
            dispatch({type:DETAIL_LIST,id})
        })
    }
}

//提交添加数据
export let subAddUserDispatch=(purpose,newid)=>{
     return (dispatch)=>{
        submiAddUserApi(purpose,newid).then((res)=>{
            dispatch({type:SUBMI_ADD,purpose,newid})
        })
     }
}



//获取全部的用户
export let getAllUsersDispatch=(dispatch)=>{
    getAllUsers().then((res)=>{
         let users=res.data.data;
         dispatch({type:USERMAGER_INIT_USER,users});
         dispatch({type:USERMAGER_ISADD,isAdd:null});
    })
}
//添加用户
export let submitSingleUserDispatch=(data)=>{
    return (dispatch)=>{
        submitSingleUser(data).then((res)=>{
            if(res.data.code===1){
                dispatch({type:USERMAGER_ADD_USER,userinfo:data})
                dispatch({type:USERMAGER_ISADD,isAdd:true})
            }else{
                dispatch({type:USERMAGER_ISADD,isAdd:false})
            }
        })
    }
}
//删除用户
export let delUserDispatch=(userid)=>{
   return (dispatch)=>{
       delUserApi(userid).then((res)=>{
        console.log(res);
           dispatch({type:USERMAGER_DEL_USER,userid});
       })
   }
}
//修改用户名
export let modifyUserDispatch=(userid,newUsername)=>{
    return (dispatch)=>{
        modifyUserApi(userid,newUsername).then((res)=>{
            dispatch({type:USERMAGER_MODIFY_USER,userid,newUsername});
        })
    }
 }
