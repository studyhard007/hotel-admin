import React from 'react';
import {Form, Input} from 'antd';
import { FormComponentProps } from "antd/lib/form/Form";
class AddCustomerForm extends React.Component<FormComponentProps> {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 14
      }
    }
    const { getFieldDecorator } =this.props.form
    return(
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='手机号'>
          {
            getFieldDecorator('phone',{
              rules: [
                {
                  required: true,
                  message: '请输入手机号'
                }
              ]
            })(
              <Input placeholder="请输入手机号"></Input>
            )
          }
        </Form.Item>
        <Form.Item label='密码'>
          {
            getFieldDecorator('password',{
              rules: [
                {
                  required: true,
                  message: '请输入密码'
                }
              ]
            })(
              <Input placeholder="请输入密码"></Input>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(AddCustomerForm);