import React,{Component} from 'react';
import { Steps } from 'antd';
const Step = Steps.Step;

const divStyle={
    textAlign:'',
    paddingTop:'6%'
}
const stepsStyle={
    width: '80%',
    marginLeft: '10%'
}

class Approval extends React.Component{
    render(){
        return (
            <div style={divStyle}>
                <Steps current={1} style={stepsStyle}>
                    <Step title="申请" description="" />
                    <Step title="审批中" description="" />
                    <Step title="完成" description="" />
                </Steps>
            </div>
        )
    }
}

export default Approval;