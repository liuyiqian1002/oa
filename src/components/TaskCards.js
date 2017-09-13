import React,{Component} from 'react';
import { Card ,Row,Col} from 'antd';
import store,{CONSTANT} from '../reducer/reducer';

class TaskCards extends React.Component{
    constructor(props){
        super(props)
        // this.handleTask = this.handleTask.bind(this);
        this.state = {
            completed:false
        }
    }
    handleTask(index){
        store.dispatch({type:CONSTANT.TASKKEY,key:index})
    }
    render(){
        const arr = ['任务一','任务二','任务三','任务四','任务五'];
        const arr2 = ['任务四','任务五','任务六','任务七','任务八'];
        // const oldState = store.getState();
         return (
            <div>
                <Row gutter={16}>
                    {arr.map((value,index) => {
                        return (
                            <div key={index}>
                                <Col span={4}>
                                    <a>
                                    <Card  style={{ width: 150 }} className={!this.state?'complete':'unfinished'}>
                                        <div onClick={()=>this.props.handleTask(index)}>
                                        <p>{value}</p>
                                        <p>Card content</p>
                                        <p>Card content</p></div>
                                    </Card>
                                    </a>
                                </Col>
                            </div>)
                    })}
                </Row>
                <br/>
                <Row gutter={16}><br/>
                    {arr2.map((value,index) => {
                        return (
                            <div key={index} onClick={()=>this.props.handleTask(index)}>
                                <Col span={4}>
                                    <a>
                                        <Card  style={{ width: 150 }} className={this.state?'complete':'unfinished'}>
                                            <p>{value}</p>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                        </Card>
                                    </a>
                                </Col>
                            </div>)
                    })}
                </Row>

            </div>
         )
    }
}

export default TaskCards;

