import Mock from "mockjs";
Mock.setup({
    timeout:'600-800'
});

let users=[
    {userid:1,username:"张三",moneyBase:0},
    {userid:2,username:"李四",moneyBase:0},
]
let submiList=[
    {
        "1":[
            {
                newDate:"2018-7-15",
                newUser:"任建蓉",
                newMoney:100,
                remarks:"买菜"
            }
        ]
    }
]
Mock.mock("/getallusers",(res)=>{
    console.log(res);
    return users;
})
//添加用户
Mock.mock("/submitSingleUser",(req,res)=>{
    let {userid,username,moneyBase}=JSON.parse(req.body);
    if(userid===""||username===""||moneyBase===""){
        return {msg:"添加失败",code:0}
    }
    users.push({userid,username,moneyBase});
    return {msg:"添加成功",code:1}
})
//删除用户
Mock.mock('/deluser',(req,res)=>{
    let {userid} = JSON.parse(req.body);
    users.forEach((item,key)=>{
        if(item.userid===userid){
            users.splice(key,1)
        }
    })
    return {msg:'删除成功',code:1}
})
//修改用户名
Mock.mock("/modifyUser",(req,res)=>{
    let {userid,newUsername} = JSON.parse(req.body);
    console.log(users);
    users.forEach((item,key)=>{
        if(item.userid===userid){
            item.username=newUsername;
        }
    })
    return {msg:'修改成功',code:1}
})

//提交页面的数据添加
Mock.mock("/submiadduser",(req,res)=>{
    let {data,newid} = JSON.parse(req.body);
    let index=users.findIndex(item=>data.newUser===item.username);
    //修改原始数据中的金额
    users[index].moneyBase=users[index].moneyBase*1+data.newMoney*1;
    //存储新数组中的数据（判断依旧是id）
    if(submiList.length===0){
         submiList.push({[newid]:[data]});
    }else{
         submiList.forEach((item)=>{
            for(let key in item){
                if(key===newid){
                    item[key].push(data);
                }else{
                    submiList.push({[newid]:[data]});
                }
            }
        })
    }
    //console.log(submiList);
    return submiList
})

Mock.mock("/allNum",(req,res)=>{
    //let {allNum}=JSON.parse(req.body);
    return {msg:'总价计算',code:1}
})

//详情数据
Mock.mock("/detaillist",(req,res)=>{
   return {msg:'详情',code:1}
})