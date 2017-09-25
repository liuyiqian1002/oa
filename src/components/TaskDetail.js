import React,{Component} from 'react';
import { Card ,Row,Col, Button, message} from 'antd';

class TaskDetail extends React.Component{
    constructor(props){
        super(props)
    }
    getSpan(finish){
        switch (finish){
            case 2:
                return <span style={{color:'green'}}>已完成</span>;
            case 0:
                return <span style={{color:'red'}}>未完成</span>;
            case 1:
                return <span style={{color:'#49a9ee'}}>审核中</span>;
            default:
                return ;
        }
    }
    onClickSubmit(url){
       /* console.log(e);
        e.target.disable = true*/
        let args = 'userId='+ this.props.taskData.userId +'&id='+this.props.taskData.id;

        if('fetch' in window){
            fetch(url,{
                method:'POST',
                credentials: "include",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:args
            })/*.then(function(response) {
                    return response.json();
                })*/.then(data=>{
                //处理返回数据
                message.success('提交完成!');
                console.log(data)
            }).catch(err=>console.log(err))
        }
    }
    render(){
        // const {key} = this.props;
        /*const title = '任务 ' + (Number(this.props.value)+1);
        const detail = 'hello mist dj';*/
        console.log(this.props.taskData)
        return (
            <div>
                <Row gutter={16}>
                    <Col span={16} offset={4}>
                        <Card title={this.props.taskData.title} extra={this.getSpan(this.props.finished)}>
                            <p>内容：{this.props.taskData.content}</p>
                            <br/>
                            <p>备注：{this.props.taskData.remarks}</p>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    {this.props.taskData.assignUserId &&
                    <Col span={6} offset={11}>
                        <Button onClick={(e)=>this.onClickSubmit('/task/submit')} type='primary' disabled={this.props.finished !== 0}>提交</Button>
                    </Col>}
                    {this.props.taskData.userId && this.props.finished !== 2 &&
                    <div>
                        <Col span={4} offset={6}>
                            <Button onClick={()=>this.onClickSubmit('/task/submit')} type='primary'>完<span style={{color:'#000'}}>一</span>成</Button>
                        </Col>
                        <Col span={4} offset={4}>
                            <Button onClick={()=>this.onClickNovia('/task/fail')}>不通过</Button>
                        </Col>
                    </div>}
                </Row>
            </div>)
    }
}

export default TaskDetail;

