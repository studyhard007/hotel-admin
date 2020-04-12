import React from "react";
import { Form, Select, Input } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import "./index.scss";
const { Option } = Select;

class CheckInSearchForm extends React.Component<FormComponentProps> {
  render() {
    // const formItemLayout = {
    //   labelCol: {
    //     span: 14
    //   },
    //   wrapperCol: {
    //     span: 10
    //   }
    // }
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <Form.Item label="房间编号">
          {getFieldDecorator(
            "number",
            {}
          )(
            <Input placeholder="请输入房间编号"></Input>
          )}
        </Form.Item>
        <Form.Item label="房间类型">
          {getFieldDecorator(
            "type",
            {}
          )(
            <Select
              allowClear={true}
              className="selecttype"
              placeholder="请选择房间类型"
            >
              <Option value="标准单床">标准单床</Option>
              <Option value="大床">大床</Option>
              <Option value="双床">双床</Option>
              <Option value="三床">三床</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="装潢类型">
          {getFieldDecorator(
            "decoration",
            {}
          )(
            <Select
              allowClear={true}
              className="selecttype"
              placeholder="请选择装潢类型"
            >
              <Option value="标准">标准</Option>
              <Option value="精装">精装</Option>
              <Option value="豪华">豪华</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="房间状态">
          {getFieldDecorator(
            "isfree",
            {}
          )(
            <Select
              allowClear={true}
              className="selecttype"
              placeholder="请选择房间状态"
            >
              <Option value="true">空闲</Option>
              <Option value="false">已入住</Option>
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(CheckInSearchForm);
