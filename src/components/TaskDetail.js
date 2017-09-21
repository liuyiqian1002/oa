import React,{Component} from 'react';
import { Card ,Row,Col} from 'antd';

class TaskDetail extends React.Component{
    constructor(props){
        super(props)
    }
    getSpan(finish){
        switch (finish){
            case 1:
                return <span style={{color:'green'}}>已完成</span>;
            case 0:
                return <span style={{color:'red'}}>未完成</span>;
            case 2:
                return <span style={{color:'#49a9ee'}}>未通过</span>;
            default:
                return ;
        }
    }
    render(){
        // const {key} = this.props;
        const title = '任务 ' + (Number(this.props.value)+1);
        const detail = 'hello mist dj';
        console.log(this.props.taskData)
        return (
            <div>
                <Row gutter={16}>
                    <Col span={16} offset={4}>
                        <Card title={this.props.taskData.title} extra={this.getSpan(this.props.finished)}>
                            <p>内容：{this.props.taskData.content}</p>
                            <p>备注：{this.props.taskData.remarks}</p>
                        </Card>
                    </Col>
                </Row>
            </div>)
    }
}

export default TaskDetail;

