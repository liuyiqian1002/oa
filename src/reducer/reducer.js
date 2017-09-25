import { combineReducers , createStore } from 'redux';

/*action
* 定义类型常量和action创建函数
* */
// const ISLOGINED = 'ISLOGINED';
export const CONSTANT = {
    ISLOGINED:'ISLOGINED',
    COLLAPSED:'COLLAPSED',
    TASKKEY:'TASKKEY'
};
function toggleLogin() {
    return {
        type:CONSTANT.ISLOGINED,
        val:false
    }
}
export function collapsed(bool) {
    return {
        type:CONSTANT.COLLAPSED,
        val:bool
    }
}

/*reducer
处理这个视图和数据状态
*/
const loginInitState = false;
export const loginState = (state = loginInitState,action) => {
    switch (action.type){
        case CONSTANT.ISLOGINED:
            return true;
        default:
            return loginInitState;
    }
};
const homeInitState = {collapsed:false,currentTask:0,key:'1',finished:0};
export const homeState = (state = homeInitState,action)=>{
    let tmpState = state;
    switch (action.type){
        case CONSTANT.COLLAPSED:
            return Object.assign({},tmpState,{collapsed:!tmpState.collapsed});
        case CONSTANT.TASKKEY:
            return Object.assign({},tmpState,{key:action.val.key,currentTask:action.val.currentTask,finished:action.val.finished});
        default:
            console.log('default')
            return homeInitState;
    }
};

/*多个reducer合成一个reducer*/
const reducer = combineReducers({loginState,homeState});

export default createStore(reducer);
