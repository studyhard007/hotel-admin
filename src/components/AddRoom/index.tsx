import React from "react";
import { Form, Input, Select, InputNumber } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;
class AddRoomForm extends React.Component<FormComponentProps> {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" {...formItemLayout}>
        <Form.Item label="房间编号">
          {getFieldDecorator("number", {
            rules: [
              {
                required: true,
                message: "请输入编号",
              },
            ],
          })(<Input placeholder="请输入房间编号"></Input>)}
        </Form.Item>
        <Form.Item label="房间类型">
          {getFieldDecorator("type", {
            rules: [
              {
                required: true,
                message: "请选择房间类型",
              },
            ],
          })(
            <Select placeholder="请选择房间类型">
              <Option value="标准单床">标准单床</Option>
              <Option value="大床">大床</Option>
              <Option value="双床">双床</Option>
              <Option value="三床">三床</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="装潢类型">
          {getFieldDecorator("decoration", {
            rules: [
              {
                required: true,
                message: "请选择装潢类型",
              },
            ],
          })(
            <Select placeholder="请选择装潢类型">
              <Option value="标准">标准</Option>
              <Option value="精装">精装</Option>
              <Option value="豪华">豪华</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="房间价格">
          {getFieldDecorator("price", {
            rules: [
              {
                required: true,
                message: "请输入价格",
              },
            ],
          })(
            <InputNumber placeholder="请输入" min={0} max={99999}></InputNumber>
          )}
        </Form.Item>
        <Form.Item label="房间介绍" required>
          {getFieldDecorator("introduction", {
            rules: [
              {
                required: true,
                message: "请输入介绍",
              },
            ],
          })(<TextArea placeholder="请输入房间介绍"></TextArea>)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AddRoomForm);
