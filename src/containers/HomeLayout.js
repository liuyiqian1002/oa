import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu, Icon ,message, Button, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import TaskCards from '../components/TaskCards'
import TaskDetail from '../components/TaskDetail'
import ShowTime from '../components/ShowTime'
import ApprovalBox from '../containers/ApprovalBox'
import OperateRecordBox from '../containers/OperateRecordBox'
import AddTask from '../components/AddTask'
import store,{CONSTANT} from '../reducer/reducer';
import cookieUtil from '../libs/cookieUtil';
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
    assginArrData = [],
    tmpArrData = [],
    userId = 0,
    isInit = true;
if(decodeURI(window.location.href).indexOf('?') !== -1){
    console.log(decodeURI(window.location.href))
    console.log(userId)
    userId = JSON.parse(decodeURI(window.location.href).substring(decodeURI(window.location.href).indexOf('?')+1,decodeURI(window.location.href).length)).id
}
//fetch请求
function getFetchData(url,arg,acData) {
    if('fetch' in window){
        fetch(url,{
            method:'POST',
            // mode:'no-cors',
            credentials: "include",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:arg
        }).then((response)=>{console.log(response);return response.json()})
            .then((data)=>{
            console.log(data)
                if (acData == 1){
                    arrData = tmpArrData = data.result;
                    store.dispatch({type:CONSTANT.TASKKEY,val:{key:state.homeState.key,currentTask:state.homeState.currentTask,finished:0}})
                }else if(acData == 2){
                    assginArrData = data.result;
                    // console.log('fetch'+acData+':'+isInit)
                    if(!isInit){
                        assginArrData = tmpArrData = data.result;
                        store.dispatch({type:CONSTANT.TASKKEY,val:{key:state.homeState.key,currentTask:state.homeState.currentTask,finished:0}})
                    }
                }else {
                    message.error('错误类型');
                    return ;
                }
            }).catch(err=>console.log(err))
    }
}

console.log('href:'+userId)

export function updateData() {
    if(userId){
        getFetchData('/task/assignList','assignUserId='+userId,2); //2代表我分配的任务
    }
}

class HomeLayout extends React.Component {
    /*componentDidMount(){
        args = JSON.parse(this.props.location.search.substring(1));
        console.log(args)
    }*/
    componentWillMount(){
        userId = JSON.parse(decodeURI(this.props.location.search.substring(1))).id;
        if(!userId){
            userId = JSON.parse(decodeURI(cookieUtil.get('userData'))).id;
        }
        console.log(userId)
        if(userId){
            getFetchData('/task/list','userId='+userId,1); //1代表我的任务
            getFetchData('/task/assignList','assignUserId='+userId,2); //2代表我分配的任务
            // console.log('init:'+isInit)
            setTimeout(function () {
                isInit = false;
            },1000)
        }


    }
    constructor(props){
        super(props)
    }
    onClickHandle = (e) => {
        //如果每次要刷新工作状态在这里需要再次请求数据
        // console.log(e)
        if(e.key === '1'){
            getFetchData('/task/list','userId='+userId,1); //1代表我的任务
            // tmpArrData = arrData;
        } else if(e.key === '2'){
            getFetchData('/task/assignList','assignUserId='+userId,2); //2代表我分配的任务
            // tmpArrData = assginArrData;
        }
        store.dispatch({type:CONSTANT.TASKKEY,val:{key:e.key,currentTask:0,finished:state.homeState.finished}})
    };
    handleTask=(value)=>{
        console.log('arg:'+value)
        store.dispatch({type:CONSTANT.TASKKEY,val:{key:state.homeState.key,currentTask:value,finished:value.isComplete}})

    };
    onClickBtnHandle=(bool,key)=>{
        if(key === '1'){
            tmpArrData = arrData.filter(value=>value.isComplete == bool);
        }else if(key === '2'){
            tmpArrData = assginArrData.filter(value=>value.isComplete == bool);
        }else{
            message.error('错误参数：'+key);
            return;
        }
        store.dispatch({type:CONSTANT.TASKKEY,val:{key:state.homeState.key,currentTask:state.homeState.currentTask,finished:bool}})
    };
    onClickBtnHandleAll=()=>{
        if(state.homeState.key === '1'){
            tmpArrData = arrData;
        } else {
            tmpArrData = assginArrData;
        }
        store.dispatch({type:CONSTANT.TASKKEY,val:{key:state.homeState.key,currentTask:state.homeState.currentTask,finished:0}})
    }
    loginOut=()=>{
        message.success('退出成功！');
        cookieUtil.unset('userName');
        cookieUtil.unset('password');
        cookieUtil.unset('userData');
    };
    render() {
        return (
            <Layout style={layoutStyle}>
                <Sider width={240} collapsible = 'false'>
                    <div className="logo" > <ShowTime/></div>
                    <Menu theme="dark" mode="inline"
                          defaultSelectedKeys={['1']}
                          onClick={(e)=>this.onClickHandle(e)}
                          defaultOpenKeys={['task']}>
                        <SubMenu key='task'
                                 title={<span><Icon type="user" /><span>我的工作</span></span>}>
                            <Menu.Item key="1">
                                <span className="nav-text">我的任务</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <span className="nav-text">我的分配</span>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3"><Icon type="video-camera" /><span className="nav-text" onClick={(e)=>this.onClickHandle(e)}>我的审批</span></Menu.Item>
                        {/*/!*<Menu.Item key="4"><Icon type="upload" /><span className="nav-text">新增工作</span></Menu.Item>*/}
                        <Menu.Item key="4"><Icon type="clock-circle-o" /><span className="nav-text">操作记录</span></Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0,textAlign:'center' }} >
                        <h1>
                            {state.homeState.key === '1' && '我的任务'}
                            {state.homeState.key === '2' && '我的分配'}
                            {state.homeState.key === '3' && '我的审批'}
                            {state.homeState.key === '4' && '操作记录'}
                        </h1>
                        <span style={{position:'absolute',fontSize:16,right:80,top:3}}>{JSON.parse(decodeURI(this.props.location.search.substring(1))).name}</span>
                        <Link to='/' onClick={this.loginOut} style={{position:'absolute',top:5,right:30,cursor:'pointer'}}><Icon type="poweroff" style={{fontSize:18,color:'red'}}/></Link>
                    </Header>
                    <Content style={{ margin: '24px 16px 0',maxHeight: winHeight-150 }}>

                        {/*{state.homeState.key === '1' && <Breadcrumb.Item>我的工作</Breadcrumb.Item>}*/}
                        {state.homeState.currentTask === 0 &&
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>
                                {state.homeState.key === '1' && '我的工作'}
                                {state.homeState.key === '2' && '我的分配'}
                                {state.homeState.key === '3' && '我的审批'}
                                {state.homeState.key === '4' && '操作记录'}
                            </Breadcrumb.Item>
                        </Breadcrumb>}
                        {state.homeState.currentTask !== 0 &&
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>
                                {state.homeState.key === '1' && '我的工作'}
                                {state.homeState.key === '2' && '我的分配'}
                                {state.homeState.key === '3' && '我的审批'}
                                {state.homeState.key === '4' && '操作记录'}
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{state.homeState.currentTask.title}</Breadcrumb.Item>
                        </Breadcrumb>}
                        {state.homeState.currentTask === 0 && state.homeState.key !== '4' &&
                        <div style={{float:'right'}}>
                            <Button type='default'
                                    onClick={()=>this.onClickBtnHandleAll()}>
                                <span style={{color:'#108ee9'}}>全<span style={{color:'#fff'}}>一</span>部</span>
                            </Button>
                            <br/>
                            <Button type='danger'  onClick={()=>this.onClickBtnHandle(0,state.homeState.key)}>未完成</Button>
                            <br/>
                            <Button type='default' onClick={()=>this.onClickBtnHandle(1,state.homeState.key)}><span style={{color:'#49a9ee'}}>审核中</span></Button>
                            <br/>

                            <Button type='default'
                                    onFocus={(e)=>{e.target.style.backgroundColor='#green'}}
                                    onClick={()=>this.onClickBtnHandle(2,state.homeState.key)}>
                                <span style={{color:'green'}}>已完成</span>
                            </Button>
                            <br/>
                            <br/>
                            {state.homeState.key === '2' && <AddTask/>}
                        </div>}
                        <div style={{ padding: 24, background: '#fff', minHeight: 360, maxHeight: winHeight-150,overflowY:'scroll'}}>
                            {/*{console.log(state.homeState.key === '1' && state.homeState.currentTask !== 0)}*/}
                            {(state.homeState.key === '1' || state.homeState.key === '2') && state.homeState.currentTask === 0 &&
                            <TaskCards arrData={tmpArrData}
                                       finished={state.homeState.finished}
                                       handleTask = {this.handleTask}
                                       style={{ width: 120 }}></TaskCards>}
                            {(state.homeState.currentTask !== 0 && (state.homeState.key === '1' || state.homeState.key === '2')) &&
                            <TaskDetail taskData={state.homeState.currentTask}
                                        finished={state.homeState.finished}
                                        value={state.homeState.currentTask}
                                        style={{ width: 120 }}
                                        taskType={state.homeState.key}
                            ></TaskDetail>}
                            {state.homeState.key === '3' && <ApprovalBox/>}
                            {state.homeState.key === '4' && <OperateRecordBox/>}
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