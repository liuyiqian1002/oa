import React,{ Component } from 'react';
import { Button, Form, Input, Radio, Modal, Checkbox } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        const options = [{ label: '刘义千', value: '1' },
                         { label: '陈龙', value: '2' },
                         { label: '吴志豪', value: '3' },
                         { label: '刘冲', value: '4' },
                         { label: '涂志明', value: '5' },
                         { label: '周芬', value: '6' },
                        ];
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
    };
    showModal = () => {
        this.setState({ visible: true });
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
            let assignUserId = 1;
            console.log('Received values of form: ', values);
            let str = 'userId='+values.userId+'&assignUserId='+assignUserId+'&title='+values.title+'&content='+values.description+'&remarks='+values.remarks;
            if('fetch' in window){
                fetch('task/add',{
                    method:'post',
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    body:str
                }).then(res=>res.json())
                    .then(data=>{
                        //处理返回数据
                        console.log(data)
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
                />
            </div>
        );
    }
}

export default Form.create()(AddTask);