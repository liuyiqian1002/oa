import React,{Component} from 'react';
import { Layout, Menu, Icon ,message, Button } from 'antd';
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

 const state = store.getState();

class HomeLayout extends React.Component {
    /*componentDidMount(){
        this.setState({key:'1'})
    }*/
    constructor(props){
        super(props)
        // this.handleTask = this.handleTask.bind(this)
    }
    state = {
        // key:'1',
        currentTask:0,
        finished:false
    };
    onClickHandle = (e) => {
        // this.setState(Object.assign({},this.state,{key:e.key,currentTask:0}))
        store.dispatch({type:CONSTANT.TASKKEY,val:{key:e.key,currentTask:0}})
        console.log(state.homeState.currentTask)
    };
    handleTask=(index,bool)=>{
        // console.log('arg:'+index)
        // this.setState(Object.assign({},this.state,{currentTask:index.toString(),finished:bool}))
        store.dispatch({type:CONSTANT.TASKKEY,val:{currentTask:index.toString(),key:'1'}})
        // console.log('store:'+store.getState())

    };
    onClickBtnHandle=(bool)=>{
        this.setState(Object.assign({},this.state,{finished:bool}))
        console.log(this.state.finished)
    };
    loginOut=()=>{
        this.props.loginOut(false);
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
                        {/*<Menu.Item key="2"><Icon type="video-camera" /><span className="nav-text">我的审批</span></Menu.Item>
                        <Menu.Item key="3"><Icon type="upload" /><span className="nav-text">新增工作</span></Menu.Item>
                        <Menu.Item key="4"><Icon type="user" /><span className="nav-text">我的审批</span></Menu.Item>*/}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0,textAlign:'center' }} >
                        <h1>{this.state.key === '1' && '我的工作'}{this.state.key === '2' && '我的审批'}</h1>
                        <span style={{position:'absolute',fontSize:16,right:80,top:3}}>larry</span>
                        <span onClick={this.loginOut} style={{position:'absolute',top:5,right:30,cursor:'pointer'}}><Icon type="poweroff" style={{fontSize:18,color:'red'}}/></span>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        {console.log(this.state.key +' '+state.homeState.key+' '+ this.state.currentTask+' '+ state.homeState.currentTask)}
                        {(this.state.key === '1' || state.homeState.key === '1') && (this.state.currentTask === 0 || state.homeState.currentTask === 0) &&
                        <div style={{float:'right'}}>
                            <Button type='danger'  onClick={()=>this.onClickBtnHandle(false)}>未完成</Button>
                            <br/>
                            <Button type='default'  onClick={()=>this.onClickBtnHandle(2)}><span style={{color:'#49a9ee'}}>未通过</span></Button>
                            <br/>
                            <Button type='default' onFocus={(e)=>{e.target.style.backgroundColor='#green'}} onClick={()=>this.onClickBtnHandle(true)}><span style={{color:'green'}}>已完成</span></Button>
                            <br/>
                            <br/>
                            <AddTask/>
                        </div>}
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {(this.state.key === '1' || state.homeState.key === '1') && this.state.currentTask === 0 && <TaskCards finished={this.state.finished} handleTask = {this.handleTask} style={{ width: 120 }}></TaskCards>}
                            {(this.state.currentTask !== 0 && (this.state.key === '1' || state.homeState.key === '1')) && <TaskDetail finished={this.state.finished} value={this.state.currentTask} style={{ width: 120 }}></TaskDetail>}
                            {this.state.key === '2' && <ApprovalBox/>}
                            {this.state.key === '3' && <AddTask/>}
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