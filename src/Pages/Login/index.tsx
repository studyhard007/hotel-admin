import React from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {RouteComponentProps} from 'react-router-dom'
import { FormComponentProps } from "antd/lib/form/Form";
import { withRouter } from 'react-router'
import {observer, inject} from 'mobx-react';
import './index.scss'

interface LoginPagePros extends RouteComponentProps, FormComponentProps {}
// @ts-ignore
@withRouter
@inject('loginstore')
@observer
class Login extends React.Component<LoginPagePros> {

 handleSubmit = (e: any) =>{
    e.preventDefault()
    this.props.form.validateFields((err, values) => {

      console.log(values);
      // @ts-ignore
      const { signIn, issuccess} = this.props.loginstore;
      signIn(values.phone, values.password);
      if(issuccess) {
        this.props.history.push('/app/checkin');
        message.success('登录成功')
      }else {
        message.error('密码错误')
      }
    })
 }
 render() {
     const { getFieldDecorator } = this.props.form
  return (
      <div className='loginwrapper'>
      <div className='title'>酒店服务管理系统</div>
      <Form onSubmit={this.handleSubmit}
      labelCol={{
        span: 5
      }}
      wrapperCol={{
        span: 14
      }}
      >
          <Form.Item>
              {getFieldDecorator('phone', {
                  rules: [{
                      required: true,
                      message: '请输入手机号'
                  }]
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 15 }} />} style={{width: '300px'}} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
              {getFieldDecorator('password', {
                  rules: [{
                      required: true,
                      message: '请输入密码'
                  }]
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 15 }} />} type='password' style={{width: '300px'}} placeholder="用户名" />
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