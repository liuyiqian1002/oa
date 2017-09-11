import React,{ Component } from 'react';
import ReactDom from 'react-dom';
import { connect,Provider } from 'react-redux';
import { CONSTANT,homeState,loginState } from './reducer/reducer';
import store from './reducer/reducer';
// import  Button from 'antd/lib/Button'
import { Button,DatePicker  } from 'antd';

//css
const h4Style = {
    textAlign:'center'
};

const App = () => (
    <div style={h4Style}>
        <h4>react component</h4>
        <Button type="primary">Primary</Button>
        <br/>
        <br/>
        <DatePicker/>
    </div>
);

/*class App extends React.Component{
    render(){
        return (<div>React</div>)
    }
}*/

function selectHomeState(state,filter) {
    switch (filter) {
        case CONSTANT.ISLOGINED:
            return state.filter(todo=>todo.text)
        default:
            return state
    }
}
function select(state) {
    return {
        loginState:state.loginState,
        homeState:selectHomeState(homeState,state.loginState)
    }
}

connect(select)(App);

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('main'));