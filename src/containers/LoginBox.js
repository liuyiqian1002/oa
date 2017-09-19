import React,{Component} from 'react'
import {BrowserRouter, Route,Redirect} from 'react-router-dom';
import Login from '../components/Login';
import HomeLayout from '../containers/HomeLayout';

const divStyle = {
    textAlign:'center !important',
    height:'100%'
};


class LoginBox extends React.Component {
    state = {
        login:false
    }
    handleLogin(bool){
        this.setState({login:bool});
    }
    render(){
        if(this.state.login){
            console.log('logined')
            return (<Redirect push to='/home'/>)
        }
        return(
        <div style={divStyle}>
            <Login login ={this.handleLogin.bind(this)}/>
        </div>
    )}
}
export default LoginBox;