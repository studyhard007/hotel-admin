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
        <Form.Item label='姓名'>
          {
            getFieldDecorator('name',{
              rules: [
                {
                  required: true,
                  message: '请输入姓名'
                }
              ]
            })(
              <Input></Input>
            )
          }
        </Form.Item>
        <Form.Item label='性别'>
          {
            getFieldDecorator('gender',{
              rules: [
                {
                  required: true,
                  message: '请输入性别'
                }
              ]
            })(
              <Input></Input>
            )
          }
        </Form.Item>
        <Form.Item label='年龄'>
          {
            getFieldDecorator('age',{
              rules: [
                {
                  required: true,
                  message: '请输入年龄'
                }
              ]
            })(
              <Input></Input>
            )
          }
        </Form.Item>
        <Form.Item label='身份证' required>
          {
            getFieldDecorator('idcard',{
              rules: [
                {
                  required: true,
                  message: '请输入身份证'
                }
              ]
            })(
              <Input></Input>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(AddCustomerForm);