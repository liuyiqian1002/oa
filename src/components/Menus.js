import React,{ Component } from 'react';
import { Menu,Icon,Button } from 'antd';
import store,{collapsed} from '../reducer/reducer';
const SubMenu = Menu.SubMenu;

let state = store.getState().homeState[0];
/*store.subscribe(function () {
    state = store.getState().homeState[0]
    console.log(store.getState())
});*/
class Menus extends React.Component{
    /*state = {
        collapsed: false,
    }*/
    constructor(props){
        super(props)
        this.state = {collapsed:false};
    }
    componentDidMount(){

    }
    toggleCollapsed = () =>{
        /*store.dispatch(collapsed(state.collapsed))
        console.log(store.getState().homeState[0].collapsed)*/
        this.setState({collapsed:!this.state.collapsed})
    }
    render(){
        return (
            <div style={{width:240,height:'100%'}}>
                <Button type='primary' onClick={()=>this.toggleCollapsed()} style={{ marginBottom: 16}}>
                    <Icon type = {this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                </Button>
                <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}>
                    <Menu.Item key="1"><Icon type = 'pie-chart' /><span>我的工作</span></Menu.Item>
                    <Menu.Item key="2"><Icon type="desktop" /><span>我的审批</span></Menu.Item>
                    <Menu.Item key="3"><Icon type="inbox" /><span>我的信息</span></Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>其他设置</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8"><p>{store.getState().homeState[0].collapsed+'11'}</p></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
};

export default Menus;