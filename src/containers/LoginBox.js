import React,{Component} from 'react'
import Login from '../components/Login';

const divStyle = {
    textAlign:'center !important',
    height:'100%'
};


const LoginBox = (props)=>(
    <div style={divStyle}>
        <Login login ={props.loginIn.bind(this)}/>
    </div>
)

export default LoginBox;