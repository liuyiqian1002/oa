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
                        <Card title={title} extra={this.props.finished?<span style={{color:'green'}}>已完成</span>:<span style={{color:'red'}}>未完成</span>}>
                            <p>{title}</p>
                            <p>{detail}</p>
                            <p>{detail+' love'}</p>
                        </Card>
                    </Col>
                </Row>
            </div>)
    }
}

export default TaskDetail;

