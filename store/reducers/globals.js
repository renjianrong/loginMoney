import {GLOBAL_ISLOADING} from "../action/globals"

const oTypes={
    [GLOBAL_ISLOADING](state,action){
        state.isLoading=action.isLoading;
    }
}
export let globals=(state={isLoading:false},action)=>{
    oTypes[action.type]&& oTypes[action.type](state,action);
    return {...state}
}
