import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Route, Link, Switch} from 'react-router-dom';
import Room from '../Room/index'
import Customer from '../Customer/index'
import './index.scss'
const {Header, Sider, Content} = Layout;

class Layouts extends React.Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" style={{color: 'white'}}>酒店服务管理系统</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="home"/>
                            <Link style={{display: 'inline-block', textDecoration: 'none'}} to={'/app/room'}>客房管理</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="user"/>
                            <Link style={{display: 'inline-block', textDecoration: 'none'}} to={'/app/customer'}>顾客管理</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 641}}>
                        <Switch>
                            <Route path="/app/room" component={Room}/>
                            <Route path="/app/customer" component={Customer}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Layouts;