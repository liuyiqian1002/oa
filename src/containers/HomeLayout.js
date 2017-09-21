import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu, Icon ,message, Button, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import TaskCards from '../components/TaskCards'
import TaskDetail from '../components/TaskDetail'
import ShowTime from '../components/ShowTime'
import ApprovalBox from '../containers/ApprovalBox'
import AddTask from '../components/AddTask'
import store,{CONSTANT} from '../reducer/reducer';
const layoutStyle = {
    width:'100%',
    height:'100%'
}
const sliderStyle = {
    width:'240px !important',
    maxWidth:'240px !important'
}

let state = store.getState();
store.subscribe(function () {
    state = store.getState()
});
let arrData = [],
    tmpArrData = [];

class HomeLayout extends React.Component {
    /*componentDidMount(){
        args = JSON.parse(this.props.location.search.substring(1));
        console.log(args)
    }*/
    componentWillMount(){
        let str = 'userId='+1;
        if('fetch' in window){
            fetch('/task/list',{
                method:'POST',
                credentials: "include",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:str
            }).then(response=>response.json())
                .then(data=>{
                    console.log(data)
                    arrData = tmpArrData = data.result;
                    store.dispatch({type:CONSTANT.TASKKEY,val:{key:state.homeState.key,currentTask:state.homeState.currentTask,finished:0}})
                }).catch(err=>console.log(err))
        }
    }
    constructor(props){
        super(props)
        // this.handleTask = this.handleTask.bind(this)
    }
    onClickHandle = (e) => {
        // this.setState(Object.assign({},this.state,{key:e.key,currentTask:0}))
        store.dispatch({type:CONSTANT.TASKKEY,val:{key:e.key,currentTask:0,finished:state.homeState.finished}})
        // console.log(state.homeState.key)
    };
    handleTask=(value)=>{
        // console.log('arg:'+index.toString())
        // this.setState(Object.assign({},this.state,{currentTask:index.toString(),finished:bool}))
        store.dispatch({type:CONSTANT.TASKKEY,val:{key:state.homeState.key,currentTask:value,finished:value.isComplete}})
        // console.log(state.homeState.currentTask+' '+state.homeState.key)

    };
    onClickBtnHandle=(bool)=>{
        // this.setState(Object.assign({},this.state,{finished:bool}))
        tmpArrData = arrData.filter(value=>value.isComplete == bool);
        store.dispatch({type:CONSTANT.TASKKEY,val:{key:state.homeState.key,currentTask:state.homeState.currentTask,finished:bool}})
    };
    onClickBtnHandleAll=()=>{
        tmpArrData = arrData;
        store.dispatch({type:CONSTANT.TASKKEY,val:{key:state.homeState.key,currentTask:state.homeState.currentTask,finished:0}})
    }
    loginOut=()=>{
        message.success('退出成功！')
    };
    render() {
        return (
            <Layout style={layoutStyle}>
                <Sider width={240} collapsible = 'false'>
                    <div className="logo" > <ShowTime/></div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={(e)=>this.onClickHandle(e)}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">我的工作</span>
                        </Menu.Item>
                        <Menu.Item key="2"><Icon type="video-camera" /><span className="nav-text" onClick={(e)=>this.onClickHandle(e)}>我的审批</span></Menu.Item>
                        {/*<Menu.Item key="3"><Icon type="upload" /><span className="nav-text">新增工作</span></Menu.Item>
                        <Menu.Item key="4"><Icon type="user" /><span className="nav-text">我的审批</span></Menu.Item>*/}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0,textAlign:'center' }} >
                        <h1>{state.homeState.key === '1' && '我的工作'}{state.homeState.key === '2' && '我的审批'}</h1>
                        <span style={{position:'absolute',fontSize:16,right:80,top:3}}>{JSON.parse(this.props.location.search.substring(1)).name}</span>
                        <Link to='/user/page/login' onClick={this.loginOut} style={{position:'absolute',top:5,right:30,cursor:'pointer'}}><Icon type="poweroff" style={{fontSize:18,color:'red'}}/></Link>
                    </Header>
                    <Content style={{ margin: '24px 16px 0',maxHeight: winHeight-150 }}>

                        {/*{state.homeState.key === '1' && <Breadcrumb.Item>我的工作</Breadcrumb.Item>}*/}
                        {state.homeState.key === '1' && state.homeState.currentTask === 0 &&
                        <Breadcrumb style={{ margin: '12px 0' }}><Breadcrumb.Item>我的工作</Breadcrumb.Item></Breadcrumb>}
                        {state.homeState.key === '2' &&
                        <Breadcrumb style={{ margin: '12px 0' }}><Breadcrumb.Item>我的审批</Breadcrumb.Item></Breadcrumb>}
                        {state.homeState.key === '1' && state.homeState.currentTask !== 0 &&
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>我的工作</Breadcrumb.Item>
                            <Breadcrumb.Item>{state.homeState.currentTask.title}</Breadcrumb.Item>
                        </Breadcrumb>}
                        {state.homeState.key === '1' && state.homeState.currentTask === 0 &&
                        <div style={{float:'right'}}>
                            <Button type='default'  onClick={()=>this.onClickBtnHandleAll()}><span style={{color:'#108ee9'}}>全<span style={{color:'#fff'}}>一</span>部</span></Button>
                            <br/>
                            <Button type='danger'  onClick={()=>this.onClickBtnHandle(0)}>未完成</Button>
                            <br/>
                            <Button type='default' onClick={()=>this.onClickBtnHandle(2)}><span style={{color:'#49a9ee'}}>未通过</span></Button>
                            <br/>
                            <Button type='default'
                                    onFocus={(e)=>{e.target.style.backgroundColor='#green'}}
                                    onClick={()=>this.onClickBtnHandle(1)}>
                                <span style={{color:'green'}}>已完成</span>
                            </Button>
                            <br/>
                            <br/>
                            <AddTask/>
                        </div>}
                        <div style={{ padding: 24, background: '#fff', minHeight: 360, maxHeight: winHeight-150,overflowY:'scroll'}}>
                            {/*{console.log(state.homeState.key === '1' && state.homeState.currentTask !== 0)}*/}
                            {state.homeState.key === '1' && state.homeState.currentTask === 0 &&
                            <TaskCards arrData={tmpArrData} finished={state.homeState.finished} handleTask = {this.handleTask} style={{ width: 120 }}></TaskCards>}
                            {(state.homeState.currentTask !== 0 && state.homeState.key === '1') &&
                            <TaskDetail taskData={state.homeState.currentTask} finished={state.homeState.finished} value={state.homeState.currentTask} style={{ width: 120 }}></TaskDetail>}
                            {state.homeState.key === '2' && <ApprovalBox/>}
                            {state.homeState.key === '3' && <AddTask/>}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default HomeLayout;

// 系统屏幕尺寸（宽高）
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;