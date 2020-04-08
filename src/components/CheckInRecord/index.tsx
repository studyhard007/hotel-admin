import React from 'react';
import {Form, Select, Input } from 'antd';
import { FormComponentProps } from "antd/lib/form/Form";
import './index.scss';
const { Option } = Select;

class CheckInRecordForm extends React.Component<FormComponentProps> {
  render() {
    // const formItemLayout = {
    //   labelCol: {
    //     span: 14
    //   },
    //   wrapperCol: {
    //     span: 10
    //   }
    // }
    const { getFieldDecorator } =this.props.form
    return (
      <Form layout='inline'>
        <Form.Item label='入住人姓名'>
          {
            getFieldDecorator('customername', {
              
            })(
              <Input placeholder='请输入入住人姓名' className='search'></Input>
            )
          }
        </Form.Item>
        <Form.Item label='入住人身份证'>
          {
            getFieldDecorator('customeridcard', {
              
            })(
              <Input placeholder='请输入入住人身份证' className='search'></Input>
            )
          }
        </Form.Item>
        <Form.Item label='房间类型'>
          {
            getFieldDecorator('type', {
              
            })(
              <Select allowClear={true} className='search' placeholder='请选择房间类型'>
                <Option value='标准单床'>标准单床</Option>
                <Option value='大床'>大床</Option>
                <Option value='双床'>双床</Option>
                <Option value='三床'>三床</Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label='装潢类型'>
          {
            getFieldDecorator('decoration',{
            })(
              <Select allowClear={true} className='search' placeholder='请选择装潢类型'>
                <Option value='标准'>标准</Option>
                <Option value='精装'>精装</Option>
                <Option value='豪华'>豪华</Option>
              </Select>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(CheckInRecordForm);
