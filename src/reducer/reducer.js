import { combineReducers , createStore } from 'redux';

/*action
* 定义类型常量和action创建函数
* */
// const ISLOGINED = 'ISLOGINED';
const CONSTANT = {
    ISLOGINED:'ISLOGINED',
    COLLAPSED:'COLLAPSED'
};
function toggleLogin() {
    return {
        type:CONSTANT.ISLOGINED,
        val:false
    }
}
export function collapsed(colla) {
    return {
        type:CONSTANT.COLLAPSED,
        val:colla
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

const homeInitState = [{collapsed:false}];
export const homeState = (state = homeInitState,action)=>{
    switch (action.type){
        case CONSTANT.COLLAPSED:
            return [Object.assign({},state[0],{collapsed:!state[0].collapsed})];
        default:
            return homeInitState;
    }
};

/*多个reducer合成一个reducer*/
const reducer = combineReducers({loginState,homeState});

export default createStore(reducer);
