import React,{Component} from 'react'
import {BrowserRouter, Route,Redirect, Link} from 'react-router-dom';
import Login from '../components/Login';
import HomeLayout from '../containers/HomeLayout';
import cookieUtil from '../libs/cookieUtil';

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
        console.log(data)
        this.setState({login:bool,data:data});
    }
    componentDidMount(){
        if(cookieUtil.get('userName') && cookieUtil.get('password')){
            this.setState({login:true,data:cookieUtil.get('userData')})
        }
    }
    render(){
        if(this.state.login){
            // console.log(JSON.stringify(this.state.data))
            return (<Redirect push to={'/home?'+encodeURI(JSON.stringify(this.state.data))}/>)
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