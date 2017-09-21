import React,{Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
const FormItem = Form.Item;


const Login = (props) => {
    let userName = '';
    let password = '';
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('register:'+userName)
    };
    const onChangeUserName = (e) => {
        // console.log('userName:' + e.target.value)
        userName = e.target.value;
    };
    const onChangePassword = (e) => {
        // console.log('password:' + e.target.value)
        password = e.target.value;
    };
    const onClickHandle =() =>{
        userName = document.getElementById('user').value;
        password = document.getElementById('pwd').value;
        let args = 'account='+userName+'&password='+password;
        // console.log(args);
        if('fetch' in window){
            fetch('/user/login',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:args
            }).then((response) => response.json())
              .then(data=>{
                  if(data.state == 100){
                      message.success(data.msg)
                      props.login(true,data.result[0]);
                      if(cookieUtil.get('loginChecked')=='true'){
                          cookieUtil.set('userName',userName,new Date().setTime(new Date().getTime()+24*60*60*1000))
                          cookieUtil.set('password',password,new Date().setTime(new Date().getTime()+24*60*60*1000))
                      }
                  }else {
                      message.error(data.msg)
                  }
              }).catch(err=>console.log(err))
        }
        /*if(cookieUtil.get('loginChecked')=='true'){
            if('larry' === cookieUtil.get('userName') && '123' === cookieUtil.get('password')){
                message.success('登录成功！')
                props.login(true);
                if(cookieUtil.get('loginChecked')=='true'){
                    cookieUtil.set('userName',userName,new Date().setTime(new Date().getTime()+24*60*60*1000))
                    cookieUtil.set('password',password,new Date().setTime(new Date().getTime()+24*60*60*1000))
                }
            }else{
                message.error('帐号或密码错误')
            }
        }else {
            if(userName === 'larry' && password === '123'){
                message.success('登录成功！')
                props.login(true);
            }else {
                message.error('帐号或密码错误')
            }
            cookieUtil.unset('userName')
            cookieUtil.unset('password')
        }*/
    };
    const onChangeCheckBox =(e) => {
        // if(!cookieUtil.get('loginChecked')){
            cookieUtil.set('loginChecked',e.target.checked)
            console.log(document.cookie)
            console.log(cookieUtil.get('loginChecked'))
        if(e.target.checked){

        }else {
            cookieUtil.unset('userName')
            cookieUtil.unset('password')
        }
        // }
    };
    return (<Form onSubmit={handleSubmit} className="login-form">
                <FormItem>
                    <Input id='user' onChange = {(e) => onChangeUserName(e)}
                           prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                           defaultValue={cookieUtil.get('loginChecked')=='true'?cookieUtil.get('userName'):''}  placeholder="Username" />
                </FormItem>
                <FormItem>
                    <Input id='pwd' onChange = {(e) => onChangePassword(e)}
                           prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                           type="password" defaultValue={cookieUtil.get('loginChecked')=='true'?cookieUtil.get('password'):''} placeholder="Password" />
                </FormItem>
                <FormItem>
                    <Checkbox defaultChecked={cookieUtil.get('loginChecked')=='true'}
                              onChange={(e)=>onChangeCheckBox(e)}
                              style = {{float:'left'}}>记住密码</Checkbox>
                    {/*<a className="login-form-forgot" href="">忘记密码</a>*/}
                    <br/>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>onClickHandle()}>
                        登 录
                    </Button>
                    Or <Link to="/register" >现在注册<Icon type="right"/></Link>

                </FormItem>
        </Form>
    );
}

export default Login;



// cookie读写封装
const cookieUtil = {
    get:(name)=>{
        let cookieName = encodeURIComponent(name)+'=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if(cookieStart > -1){
            let cookieEnd = document.cookie.indexOf(';',cookieStart);
            if(cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd))
        }
        return cookieValue;
    },
    set:(name,value,expires,path,domain,secure)=> {
        let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += ";expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += ";path=" + path;
        }

        if (secure) {
            cookieText += ";secure=" + secure;
        }
        document.cookie = cookieText;
    },
    unset:(name,path,domain,secure)=>{
        cookieUtil.set(name,'',new Date(0),path,domain,secure);
    }

};
console.log(document.cookie)
/*
//如果帐号密码不是larry 123就重置为larry 123
if(cookieUtil.get('userName') !== 'larry' && cookieUtil.get('password') !== '123'){
    console.log('reset')
    cookieUtil.set('userName','larry')
    cookieUtil.set('password','123')
}*/
