import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


const Login = () => {
    let userName = '';
    let password = '';
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('register:'+userName)
    };
    const onChangeUserName = (e) => {
        console.log('userName:' + e.target.value)
        userName = e.target.value;
    };
    const onChangePassword = (e) => {
        console.log('password:' + e.target.value)
        password = e.target.value;
    };
    return (<Form onSubmit={handleSubmit} className="login-form">
                <FormItem>
                    <Input onChange = {(e) => onChangeUserName(e)} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                </FormItem>
                <FormItem>
                    <Input onChange = {(e) => onChangePassword(e)} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                </FormItem>
                <FormItem>
                    <Checkbox style = {{float:'left'}}>记住密码</Checkbox>
                    {/*<a className="login-form-forgot" href="">忘记密码</a>*/}
                    <br/>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading>
                        登 录
                    </Button>
                    {/*Or <a href="register.html">现在注册<Icon type="right"/></a>*/}

                </FormItem>
        </Form>
    );
}

export default Login;