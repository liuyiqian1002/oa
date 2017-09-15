import React,{ Component } from 'react';
import ReactDom from 'react-dom';
import { connect,Provider } from 'react-redux';
import store,{collapsed,CONSTANT} from './reducer/reducer';
import LoginBox from './containers/LoginBox';
import RegisterBox from './containers/RegisterBox';
import MenuBox from './containers/MenuBox';
import HomeLayout from './containers/HomeLayout';
import Antd from './components/Antd';

//css
const h4Style = {
    // textAlign:'center',
    height:'100%'
};

class App extends React.Component {
    state = {
        login:false
    }
    handleLogin(bool){
        this.setState({login:bool});
    }
    componentWillMount(){
        document.cookie='userName=larry';
        document.cookie='password=123';
        console.log(document.cookie)
        if(true){
            this.setState({login:true})
}
}
render(){
    return (
        <div style={h4Style}>
            {!this.state.login && <LoginBox loginIn = {this.handleLogin.bind(this)}></LoginBox>}
            {this.state.login && <HomeLayout loginOut = {this.handleLogin.bind(this)}></HomeLayout>}
        </div>
    )
}

}

/*class App extends React.Component{
    render(){
        return (<div>React</div>)
    }
}*/

function mapStateToProps(state) {
    return {
        loginState:state.loginState,
        homeState:state.homeState
    }
}
//映射Redux action到组件属性
function mapDispatchToProps(dispatch) {
    return {
        onClick:dispatch(collapsed(CONSTANT.COLLAPSED))
    }
}


const App1=connect(mapStateToProps)(App);

ReactDom.render(
    <Provider store={store}>
        <App1/>
    </Provider>,
    document.getElementById('main'));