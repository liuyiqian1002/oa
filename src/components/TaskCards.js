import React,{Component} from 'react';
import { Card ,Row,Col} from 'antd';

class TaskCards extends React.Component{

    render(){
        const arr = ['任务一','任务二','任务三','任务四','任务五'];
        return (
            <div>
                <Row gutter={16}>
                    {arr.map(function (value,index) {
                        return (
                            <Col key={index} span={4}>
                                <Card style={{ width: 150 }}>
                                    <p>{value}</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Col>
                        )
                    })}
                    <Col span={4}>
                        <Card style={{ width: 150 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card style={{ width: 150 }}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card style={{ width: 150 }}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card style={{ width: 150 }}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
            </div>)
    }
}

export default TaskCards;

