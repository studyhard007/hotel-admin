import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { FormComponentProps } from "antd/lib/form/Form";
import { withRouter } from "react-router";
import { observer, inject } from "mobx-react";
import "./index.scss";

interface LoginPagePros extends RouteComponentProps, FormComponentProps {}
// @ts-ignore
@withRouter
@inject("loginstore")
@observer
class Login extends React.Component<LoginPagePros> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // @ts-ignore
      const { signIn } = this.props.loginstore;
      signIn(values.phone, values.password);
      // @ts-ignore
      setTimeout(() => {
        // @ts-ignore
        const { issuccess } = this.props.loginstore;
        if (issuccess) {
          this.props.history.push("/app/checkin");
        } else {
          return;
        }
      }, 500);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="loginwrapper">
        <div className="title">酒店服务管理系统</div>
        <Form
          onSubmit={this.handleSubmit}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
        >
          <Form.Item>
            {getFieldDecorator("phone", {
              rules: [
                {
                  required: true,
                  message: "请输入手机号",
                },
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 15 }} />}
                style={{ width: "300px" }}
                placeholder="请输入用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "请输入密码",
                },
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 15 }} />}
                type="password"
                style={{ width: "300px" }}
                placeholder="请输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button  style={{width: '300px'}} type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
