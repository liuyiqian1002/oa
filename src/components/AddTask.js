import React,{ Component } from 'react';
import store,{CONSTANT} from '../reducer/reducer';
import { Button, Form, Input, Radio, Modal, Checkbox, message } from 'antd';
import cookieUtil from '../libs/cookieUtil';
import {updateData} from '../containers/HomeLayout'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;


let state = store.getState();
store.subscribe(function () {
    state = store.getState()
});

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, options } = props;
        const { getFieldDecorator } = form;
        const onChange = (values)=>{
            console.log(values.target.value);
        }
        return (
            <Modal
                visible={visible}
                title="新增工作"
                okText="添加"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="标题">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="工作描述">
                        {getFieldDecorator('description')(<Input type="textarea" />)}
                    </FormItem>
                    <FormItem label="备注">
                        {getFieldDecorator('remarks')(<Input type="textarea" />)}
                    </FormItem>
                    <FormItem className="collection-create-form_last-form-item">
                        {getFieldDecorator('userId', {
                            initialValue: '1',
                            required: true,
                        })(
                            <RadioGroup options={options} onChange={onChange}></RadioGroup>
                        )}
                        {/*<CheckboxGroup options={options} defaultValue={['刘义千']} onChange={onChange} />*/}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

class AddTask extends React.Component {
    state = {
        visible: false,
        userData:[]
    };
    showModal = () => {
        //获取用户列表
        if('fetch' in window) {
            fetch('/user/getAll',{
                method:'POST',
                credentials: "include",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => response.json())
                .then(data=>{
                    //处理返回数据
                    const options = [];
                    data.result.map((value,index)=>{
                        let temp = {};
                        temp.label = value.name;
                        temp.value = String(value.id);
                        options.push(temp);
                    })
                    this.setState({ visible: true,userData: options});
                }).catch(err=>console.log(err))
        }
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log(decodeURI(location.href).substring(decodeURI(location.href).indexOf('?')+1));
            let assignUserId = JSON.parse(decodeURI(location.href).substring(decodeURI(location.href).indexOf('?')+1)).id;
            /*console.log('assignUserId:'+assignUserId)
            console.log('Received values of form: ', values);*/
            let str = 'userId='+values.userId+'&assignUserId='+assignUserId+'&title='+values.title+'&content='+values.description+'&remarks='+values.remarks;
            console.log(str)
            if('fetch' in window){
                fetch('/task/add',{
                    method:'POST',
                    credentials: "include",
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:str
                })/*.then(function(response) {
                    return response.json();
                })*/.then(data=>{
                        //处理返回数据
                        console.log(data)
                    if(data.ok){
                        message.success('增加成功！');
                        updateData();
                    }
                    }).catch(err=>console.log(err))
            }
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <Button type="primary"  onClick={this.showModal}>增加</Button>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    options={this.state.userData}
                />
            </div>
        );
    }
}

export default Form.create()(AddTask);