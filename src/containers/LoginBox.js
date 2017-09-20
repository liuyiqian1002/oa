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
        login:false,
        data:''
    }
    handleLogin(bool,data){
        this.setState({login:bool,data:JSON.stringify(data)});
    }
    render(){
        if(this.state.login){
            return (<Redirect push to={'/home?'+this.state.data}/>)
        }
        return(
        <div style={divStyle}>
            <Login login ={this.handleLogin.bind(this)}/>
        </div>
    )}
}
export default LoginBox;