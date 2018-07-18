import axios from "axios";
import {PORT,testPort} from "./port";

export const getAllUsers=()=>{
    return axios.get(testPort+"/getallusers");
}
export const submitSingleUser=(data)=>{
    return axios.post(testPort+"/submitSingleUser",data);
}
//删除接口
export const delUserApi=(userid)=>{
    return axios.post(testPort+"/deluser",{userid})
}
//修改用户名
export const modifyUserApi=(userid,newUsername)=>{
    return axios.post(testPort+"/modifyUser",{userid,newUsername})
}
//提交页面的数据添加
export const submiAddUserApi=(data,newid)=>{
    return axios.post(PORT+"/submiadduser",{data,newid})
}
//结算总价
export const computAllNumApi=(allNum)=>{
    return axios.post(PORT+"/allNum",allNum);
}

//详情数据
export const detailLstApi=(id)=>{
    return axios.post(PORT+"/detaillist",id);
}