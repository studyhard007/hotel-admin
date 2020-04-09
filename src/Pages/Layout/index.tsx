import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Route, Link, Switch} from 'react-router-dom';
import Room from '../Room/index'
import Customer from '../Customer/index'
import CheckIn from '../CheckIn/index';
import CheckOut from '../CheckOut/index';
import CheckInSearch from '../CheckInSearch';
import BillInquiry from '../BillInquiry';
import './index.scss'
import {observer, inject} from 'mobx-react';
const {Header, Sider, Content} = Layout;
@inject('loginstore')
@observer
class Layouts extends React.Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    componentDidMount(){
    // @ts-ignore
    console.log(this.props.loginstore)
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
                            <Icon type="user-add"/>
                            <Link style={{display: 'inline-block', textDecoration: 'none'}} to={'/app/checkin'}>入住管理</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="user-add"/>
                            <Link style={{display: 'inline-block', textDecoration: 'none'}} to={'/app/checkinsearch'}>入住查询</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="user-add"/>
                            <Link style={{display: 'inline-block', textDecoration: 'none'}} to={'/app/billinquiry'}>账单查询</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="home"/>
                            <Link style={{display: 'inline-block', textDecoration: 'none'}} to={'/app/room'}>客房管理</Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="user"/>
                            <Link style={{display: 'inline-block', textDecoration: 'none'}} to={'/app/customer'}>普通管理员</Link>
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
                            <Route path='/app/checkin' component={CheckIn} />
                            <Route path="/app/room" component={Room}/>
                            <Route path="/app/customer" component={Customer}/>
                            <Route path='/app/checkout' component={CheckOut} />
                            <Route path='/app/checkinsearch' component={CheckInSearch} />
                            <Route path='/app/billinquiry' component={BillInquiry} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Layouts;