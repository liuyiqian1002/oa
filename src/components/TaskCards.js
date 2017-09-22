import React,{Component} from 'react';
import { Card ,Row,Col, Pagination} from 'antd';

const cardStyle = {minWidth: 80,maxWidth:150,height:150}

class TaskCards extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        // const oldState = store.getState();
        console.log(this.props.arrData)
         return (
            <div style={{width:'90%',textAlign:'center'}}>
                <Row gutter={16}>
                    {this.props.arrData.map((value,index) => {
                        // console.log(value)
                        return (
                            <div key={index} onClick={()=>this.props.handleTask(value)}>
                                <Col span={4}>
                                    <a>
                                    <Card title={value.title} style={cardStyle} className={'complete_'+value.isComplete}>
                                        <p>{value.content}</p>
                                    </Card>
                                    </a>
                                </Col>
                                {index !== 0 && (index+1) % 6 == 0 && <div>&nbsp;</div>}
                            </div>)
                    })}
                </Row>
                <br/><br/><br/><br/>
                <Pagination defaultCurrent={1} total={50}></Pagination>
            </div>
         )
    }
}

export default TaskCards;

