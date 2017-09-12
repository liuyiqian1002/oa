import React,{Component} from 'react';
import { Layout, Menu, Icon ,Card} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import TaskCards from '../components/TaskCards'

const layoutStyle = {
    width:'100%',
    height:'100%'
}
const sliderStyle = {
    width:'240px !important',
    maxWidth:'240px !important'
}

class HomeLayout extends React.Component {
    render() {
        return (
            <Layout style={layoutStyle}>
                <Sider width={240} collapsible = 'false'>
                    <div className="logo" >在线办公系统</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
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
                        <h3>我的工作</h3>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <TaskCards style={{ width: 120 }}>
                            </TaskCards>
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