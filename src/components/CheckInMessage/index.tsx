import React from 'react';
import {Form, Input, DatePicker, InputNumber } from 'antd';
import 'moment/locale/zh-cn';
import { FormComponentProps } from "antd/lib/form/Form";

class CheckInMessage extends React.Component<FormComponentProps> {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 12
      }
    }
    const { getFieldDecorator } =this.props.form
    return (
     <Form layout='horizontal' {...formItemLayout}>
       <Form.Item label='姓名'>
         {
           getFieldDecorator('customername', {
             rules: [
               {
                 required: true,
                 message: '请输入姓名'
               }
             ]
           })(
             <Input style={{width: '300px'}} placeholder="请输入顾客姓名"></Input>
           )
         }
       </Form.Item>
       <Form.Item label='身份证号'>
         {
           getFieldDecorator('customeridcard', {
             rules: [
               {
                 required: true,
                 message: '请输入身份证号'
               }
             ]
           })(
             <Input style={{width: '300px'}} placeholder="请输入顾客身份证"></Input>
           )
         }
       </Form.Item>
       <Form.Item label='收取押金'>
         {
           getFieldDecorator('deposit', {
            initialValue: 100,
            rules: [
              {
                required: true,
                message: '请输入押金数'
              }
            ]
           })(
             <InputNumber  style={{width: '300px'}}></InputNumber>
           )
         }
       </Form.Item>
       <Form.Item label='退房时间'>
         {
           getFieldDecorator('checkouttime', {
             rules: [
               {
                 required: true,
                 message: '请选择退房时间'
               }
             ]
           })(
            <DatePicker style={{width: '300px'}} placeholder="请选择退房时间"></DatePicker>
           )
         }
       </Form.Item>
     </Form>
    )
  }
}

export default Form.create()(CheckInMessage);