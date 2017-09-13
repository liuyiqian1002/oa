import React,{Component} from 'react';
import { Layout, Menu, Icon ,message,Button} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import TaskCards from '../components/TaskCards'
import TaskDetail from '../components/TaskDetail'
import ApprovalBox from '../containers/ApprovalBox'
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
        key:'1',
        currentTask:0
    };
    onClickHandle = (e) => {
        this.setState(Object.assign({},this.state,{key:e.key,currentTask:0}))
    };
    handleTask=(index)=>{
        console.log('arg:'+index)
        this.setState(Object.assign({},this.state,{currentTask:index.toString()}))
        store.dispatch({type:CONSTANT.TASKKEY,key:index})
        console.log(state.currentTask)

    };
    loginOut=()=>{
        message.success('退出成功！')
    };
    render() {
        return (
            <Layout style={layoutStyle}>
                <Sider width={240} collapsible = 'false'>
                    <div className="logo" >  LOGO在线办公系统</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={(e)=>this.onClickHandle(e)}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">我的工作</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">我的审批</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="nav-text">我的工作</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="user" />
                            <span className="nav-text">我的审批</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0,textAlign:'center' }} >
                        <h1>{this.state.key === '1' && '我的工作'}{this.state.key === '2' && '我的审批'}</h1>
                        <span onClick={this.loginOut} style={{position:'absolute',top:5,right:30}}><Icon type="poweroff" style={{fontSize:18,color:'red'}}/></span>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{float:'right'}}>
                            <Button type='danger'>未完成</Button>
                            <Button type='primary'>已完成</Button>
                        </div>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.state.key === '1' && this.state.currentTask === 0 && <TaskCards handleTask = {this.handleTask} style={{ width: 120 }}></TaskCards>}
                            {(this.state.currentTask !== 0) && <TaskDetail value={this.state.currentTask} style={{ width: 120 }}></TaskDetail>}
                            {this.state.key === '2' && <ApprovalBox/>}
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