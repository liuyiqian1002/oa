import React,{Component} from 'react';
import { Card ,Row,Col, Pagination} from 'antd';
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
        // store.dispatch({type:CONSTANT.TASKKEY,key:index})
    }
    render(){
        const arr = ['任务一','任务二','任务三','任务四','任务五'];
        const arr2 = ['任务四','任务五','任务六','任务七','任务八'];
        // const oldState = store.getState();
         return (
            <div style={{width:'90%',textAlign:'center'}}>
                {this.props.finished &&
                <Row gutter={16}>
                    {arr.map((value,index) => {
                        if(!this.props.finished){return;}
                        return (
                            <div key={index}>
                                <Col span={4}>
                                    <a>
                                    <Card  style={{ width: 150 }} className={this.props.finished?'complete':'unfinished'}>
                                        <div onClick={()=>this.props.handleTask(index,this.props.finished)}>
                                        <p>{value}</p>
                                        <p>Card content</p>
                                        <p>Card content</p></div>
                                    </Card>
                                    </a>
                                </Col>
                            </div>)
                    })}
                    <Col span={12} offset={18}/>
                </Row>}
                {/*{!this.props.finished && <br/>}*/}
                <Row gutter={16}><br/>
                    {arr2.map((value,index) => {
                        if(this.props.finished){return;}
                        return (
                            <div key={index} onClick={()=>this.props.handleTask(index)}>
                                <Col span={4}>
                                    <a>
                                        <Card bodyStyle={{backgroundColor:'#eee' }} style={{ width: 150 }} className={this.props.finished?'complete':'unfinished'} noHovering>
                                            <p>{value}</p>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                        </Card>
                                    </a>
                                </Col>
                            </div>)
                    })}
                    <Col span={8}/>
                </Row>
                {/*<br/>*/}
                <Row gutter={16}><br/>
                    {arr2.map((value,index) => {
                        if(!this.props.finished){return;}
                        return (
                            <div key={index} onClick={()=>this.props.handleTask(index)}>
                                <Col span={4}>
                                    <a>
                                        <Card  style={{ width: 150 }} className={this.props.finished?'complete':'unfinished'}>
                                            <p>{value}</p>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                        </Card>
                                    </a>
                                </Col>
                            </div>)
                    })}
                    <Col span={8}/>
                </Row>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <Pagination defaultCurrent={1} total={50}></Pagination>
            </div>
         )
    }
}

export default TaskCards;

