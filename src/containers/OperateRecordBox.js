import React,{Component} from 'react';
import OperateRecord from '../components/OperateRecord';

const style = {
    // textAlign:'center',
    marginLeft:'25%'
}

class OperateRecordBox extends React.Component{
    state={data:[]}
    componentDidMount(){
        // let _this = this;
        // _this.setState({data:[{title:1}]})
        if('fetch' in window){
            fetch('/task/taskDataAll',{
                method:'POST',
                credentials: "include",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'taskId='
            }).then(function(response) {
                    return response.json();
                }).then(data=>{
                //处理返回数据
                console.log(data)
                if(data.state === 100){
                    this.setState({data:data.result});
                }
            }).catch(err=>console.log(err))
        }
    }
    render(){
        return (<OperateRecord style={style} data={this.state.data}></OperateRecord>)
    }
}


export default OperateRecordBox;