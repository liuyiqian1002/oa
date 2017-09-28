import React,{Component} from 'react'
import {BrowserRouter, Route,Redirect, Link} from 'react-router-dom';
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
            return (<Redirect push to={'/home?'+encodeURI(this.state.data)}/>)
           /* return (<Link to={{
                pathname: '/',
                search: '?'+encodeURI(this.state.data),
                hash: '#home',
                state: { fromDashboard: true }
            }}/>)*/
        }
        return(
        <div style={divStyle}>
            <Login login ={this.handleLogin.bind(this)}/>
        </div>
    )}
}
export default LoginBox;