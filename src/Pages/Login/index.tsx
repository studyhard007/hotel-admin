import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import { FormComponentProps } from "antd/lib/form/Form";

class Login extends React.Component<FormComponentProps> {
 handleSubmit = (e: any) =>{
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
        if(!err) {
            console.log('-----------Success!')
        }
    })
 }
 render() {
     const { getFieldDecorator } = this.props.form
  return (
      <Form onSubmit={this.handleSubmit}>
          <Form.Item>
              {getFieldDecorator('username', {
                  rules: [{
                      required: true,
                      message: '请输入用户名'
                  }]
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
              {getFieldDecorator('username', {
                  rules: [{
                      required: true,
                      message: '请输入密码'
                  }]
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='password' placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
      </Form>
  )
 }
}

export default (Form.create()(Login));