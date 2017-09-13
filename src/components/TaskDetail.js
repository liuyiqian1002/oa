import React,{Component} from 'react';
import { Card ,Row,Col} from 'antd';

class TaskDetail extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        // const {key} = this.props;
        const title = '任务 ' + (Number(this.props.value)+1);
        const detail = 'hello mist dj';
        // console.log(this.props)
        return (
            <div>
                <Row gutter={16}>
                    <Col span={16} offset={4}>
                        <Card title={title} style={{ width: '100%' }}>
                            <p>{title}</p>
                            <p>{detail}</p>
                            <p>{detail+' hello'}</p>
                        </Card>
                    </Col>
                </Row>
            </div>)
    }
}

export default TaskDetail;

