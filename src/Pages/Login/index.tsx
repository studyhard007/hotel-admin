import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {RouteComponentProps} from 'react-router-dom'
import { FormComponentProps } from "antd/lib/form/Form";
import { withRouter } from 'react-router'
import './index.scss'

interface LoginPagePros extends RouteComponentProps, FormComponentProps {}
// @ts-ignore
@withRouter
class Login extends React.Component<LoginPagePros> {
 handleSubmit = (e: any) =>{
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
        if(!err) 
        {
           this.props.history.push('/app/room')
           console.log(this.props);
        }
    })
 }
 render() {
     const { getFieldDecorator } = this.props.form
  return (
      <div className='loginwrapper'>
      <Form onSubmit={this.handleSubmit}
      labelCol={{
        span: 5
      }}
      wrapperCol={{
        span: 14
      }}
      >
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
                        <Checkbox>记住我</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit">
                    Log in
                    </Button>
                    <a href="https:www.baidu.com">Forgot password</a>
                    Or <a href="https:www.baidu.com">register now!</a>
                </Form.Item>
      </Form>
      </div>
  )
 }
}

export default Form.create()(Login);