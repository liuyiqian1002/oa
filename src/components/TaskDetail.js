import React,{Component} from 'react';
import { Card ,Row,Col} from 'antd';

class TaskDetail extends React.Component{
    constructor(props){
        super(props)
    }
    getSpan(finish){
        switch (finish){
            case true:
                return <span style={{color:'green'}}>已完成</span>;
            case false:
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
        // console.log(this.props)
        return (
            <div>
                <Row gutter={16}>
                    <Col span={16} offset={4}>
                        <Card title={title} extra={this.getSpan(this.props.finished)}>
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

