import React from "react";
import { Layout, Menu, Icon, Dropdown } from "antd";
import { Route, Link, Switch } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router";
import Room from "../Room/index";
import Customer from "../Customer/index";
import CheckIn from "../CheckIn/index";
import CheckOut from "../CheckOut/index";
import CheckInSearch from "../CheckInSearch";
import BillInquiry from "../BillInquiry";
import Performance from '../Performance';
import "./index.scss";
import { observer, inject } from "mobx-react";
const { Header, Sider, Content } = Layout;
// @ts-ignore
@withRouter
@inject("loginstore")
@observer
class Layouts extends React.Component<RouteComponentProps> {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  componentDidMount() {}
  render() {
    const phone = localStorage.getItem("phone");
    const issuper = localStorage.getItem("issuper");

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" style={{ color: "white" }}>
            酒店服务管理系统
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="user-add" />
              <Link
                style={{ display: "inline-block", textDecoration: "none" }}
                to={"/app/checkin"}
              >
                入住管理
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user-add" />
              <Link
                style={{ display: "inline-block", textDecoration: "none" }}
                to={"/app/checkinsearch"}
              >
                入住查询
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="account-book" />
              <Link
                style={{ display: "inline-block", textDecoration: "none" }}
                to={"/app/billinquiry"}
              >
                账单查询
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="bar-chart" />
              <Link
                style={{ display: "inline-block", textDecoration: "none" }}
                to={"/app/performance"}
              >
                业绩看板
              </Link>
            </Menu.Item>
            <Menu.Item key="5" disabled={issuper === "true" ? false : true}>
              <Icon type="home" />
              <Link
                style={{ display: "inline-block", textDecoration: "none" }}
                to={"/app/room"}
              >
                客房管理
              </Link>
            </Menu.Item>
            <Menu.Item key="6" disabled={issuper === "true" ? false : true}>
              <Icon type="user" />
              <Link
                style={{ display: "inline-block", textDecoration: "none" }}
                to={"/app/customer"}
              >
                普通管理员
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="header" style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <Dropdown
              placement="bottomCenter"
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() => {
                      this.props.history.push("/");
                    }}
                  >
                    <Icon type="logout" />
                    退出登录
                  </Menu.Item>
                </Menu>
              }
            >
              <div className="header-right">
                <span>{phone ? phone : ""}</span>
                <Icon type="down" />
              </div>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 641,
            }}
          >
            <Switch>
              <Route path="/app/checkin" component={CheckIn} />
              <Route path="/app/room" component={Room} />
              <Route path="/app/customer" component={Customer} />
              <Route path="/app/checkout" component={CheckOut} />
              <Route path="/app/checkinsearch" component={CheckInSearch} />
              <Route path="/app/billinquiry" component={BillInquiry} />
              <Route path="/app/performance" component={Performance} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Layouts;
