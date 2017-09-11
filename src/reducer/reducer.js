import { combineReducers , createStore } from 'redux';

/*action
* 定义类型常量和action创建函数
* */
// const ISLOGINED = 'ISLOGINED';
export const CONSTANT = {ISLOGINED:'ISLOGINED'};
function toggleLogin() {
    return {
        type:ISLOGINED,
        val:false
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

const homeInitState = [];
export const homeState = (state = homeInitState,action)=>{
    switch (action.type){
        case CONSTANT.ISLOGINED:
            return [...state,
                {
                    text:'demo'
                }];
        default:
            return homeInitState;
    }
};

/*多个reducer合成一个reducer*/
const reducer = combineReducers({loginState,homeState});

export default createStore(reducer);
