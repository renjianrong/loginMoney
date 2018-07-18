// import Money from "../component/Money";
// import Home from "../component/Home";
// import Detail from "../component/Detail";
// import Submi from "../component/Submi";
// import Computed from "../component/Computed";
// import User from "../component/User";

import {LoadAsyncCom,Loading} from "../tools/LoadAsyncCom"

let config=[
    {path:"/money",render:LoadAsyncCom(()=>import("../component/Money"),Loading),children:[
        {path:"/home",render:LoadAsyncCom(()=>import("../component/Home"),Loading),cont:"首页"},
        {path:"/detail",render:LoadAsyncCom(()=>import("../component/Detail"),Loading),cont:"详情"},
        {path:"/submi",render:LoadAsyncCom(()=>import("../component/Submi"),Loading),cont:"提交"},
        {path:"/computed",render:LoadAsyncCom(()=>import("../component/Computed"),Loading),cont:"结算"}
    ]},
    {path:"/user",render:LoadAsyncCom(()=>import("../component/User"),Loading)}
]
export default config;