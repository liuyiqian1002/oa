import React,{ Component } from 'react';
import ReactDom from 'react-dom';
import { connect,Provider } from 'react-redux';
import { CONSTANT,homeState,loginState } from './reducer/reducer';
import store from './reducer/reducer';
import LoginBox from './containers/LoginBox';
import RegisterBox from './containers/RegisterBox';

//css
const h4Style = {
    textAlign:'center',
    height:'100%'
};

const App = () => (
    <div style={h4Style}>
        <RegisterBox></RegisterBox>
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