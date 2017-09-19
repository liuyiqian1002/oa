import React,{ Component } from 'react';
import { Button, Form, Input, Radio, Modal, Checkbox } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        const options = ['刘义千','陈龙','吴志豪','刘冲','涂志明','周芬',];
        const onChange = (values)=>{
            console.log(values);
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
                    <FormItem className="collection-create-form_last-form-item">
                        {getFieldDecorator('modifier', {
                            initialValue: 'public',
                        })(
                            <Radio.Group>
                                <Radio value="刘义千">刘义千</Radio>
                                <Radio value="陈龙">陈龙</Radio>
                                <Radio value="吴志豪">吴志豪</Radio>
                                <Radio value="刘冲">刘冲</Radio>
                                <Radio value="涂志明">涂志明</Radio>
                                <Radio value="周芬">周芬</Radio>
                            </Radio.Group>
                        )}
                        <CheckboxGroup options={options} defaultValue={['刘义千']} onChange={onChange} />

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

            console.log('Received values of form: ', values);
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