import React,{Component} from 'react';
import { Card ,Row,Col, Pagination} from 'antd';

const cardStyle = {minWidth: 80,maxWidth:150}

class TaskCards extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const arr = ['任务一','任务二','任务三','任务四','任务五','任务四','任务五','任务六','任务七','任务八','任务七','任务九',
            '任务一','任务二','任务三','任务四','任务五','任务四','任务五','任务六','任务七','任务八','任务七','任务九'];
        const arr2 = ['任务一','任务二','任务三','任务四','任务五','任务四','任务五','任务六','任务七','任务八','任务七'];
        // const oldState = store.getState();
         return (
            <div style={{width:'90%',textAlign:'center'}}>
                {(this.props.finished === true || this.props.finished === 3) &&
                <Row gutter={16}>
                    {arr.map((value,index) => {
                        return (
                            <div key={index}>
                                <Col span={4}>
                                    <a>
                                    <Card  style={cardStyle} className={'complete'}>
                                        <div onClick={()=>this.props.handleTask(index,this.props.finished)}>
                                        <p>{value}</p>
                                        <p>Card content</p>
                                        <p>Card content</p></div>
                                    </Card>
                                    </a>
                                </Col>
                                {index !== 0 && (index+1) % 6 == 0 && <div>&nbsp;</div>}
                            </div>)
                    })}
                </Row>}
                {arr.length%6 !== 0 && <div>&nbsp;</div>}
                {/*{!this.props.finished && <br/>}*/}
                {(this.props.finished === 3 || this.props.finished === false) &&
                <Row gutter={16}>
                    {arr2.map((value,index) => {
                        return (
                            <div key={index} onClick={()=>this.props.handleTask(index,this.props.finished)}>
                                <Col span={4}>
                                    <a>
                                        <Card bodyStyle={{backgroundColor:'#eee' }} style={cardStyle} className={'unfinished'} noHovering>
                                            <p>{value}</p>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                        </Card>
                                    </a>
                                </Col>
                                {index !== 0 && (index+1) % 6 == 0 && <div>&nbsp;</div>}
                            </div>)
                    })}
                </Row>}
                <div>&nbsp;</div>
                {/*<br/>*/}
                {(this.props.finished === 2 || this.props.finished === 3) &&
                <Row gutter={16}>
                    {arr2.map((value,index) => {
                        return (
                            <div key={index} onClick={()=>this.props.handleTask(index,this.props.finished)}>
                                <Col span={4}>
                                    <a>
                                        <Card  style={cardStyle} className={'noVia'}>
                                            <p>{value}</p>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                        </Card>
                                    </a>
                                </Col>
                                {index !== 0 && (index+1) % 6 == 0 && <div>&nbsp;</div>}
                            </div>)
                    })}
                    <div>&nbsp;</div>
                </Row>}
                <br/><br/><br/><br/>
                <Pagination defaultCurrent={1} total={50}></Pagination>
            </div>
         )
    }
}

export default TaskCards;

