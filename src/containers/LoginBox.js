import React,{Component} from 'react'
import Login from '../components/Login';

const divStyle = {
    textAlign:'center !important',
    height:'100%'
};


const LoginBox = ()=>(
    <div style={divStyle}>
        <Login/>
    </div>
)

export default LoginBox;