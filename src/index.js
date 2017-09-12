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

const App = () => (
    <div style={h4Style}>
        {/*<LoginBox></LoginBox>*/}
        <HomeLayout></HomeLayout>
    </div>
);

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


connect(mapStateToProps,mapDispatchToProps)(App);

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('main'));