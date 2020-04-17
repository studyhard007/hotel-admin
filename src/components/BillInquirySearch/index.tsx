import React from "react";
import { Form, Select, DatePicker } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import "./index.scss";
const { Option } = Select;
const { RangePicker } = DatePicker;
class CheckInRecordForm extends React.Component<FormComponentProps> {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <Form.Item label="统计时间">
          {getFieldDecorator("getBillintime", {
            rules: [
              {
                required: false,
              },
            ],
          })(
            <RangePicker
              style={{ width: "300px" }}
              placeholder={['开始时间',"结束时间"]}
            ></RangePicker>
          )}
        </Form.Item>
        <Form.Item label="房间类型">
          {getFieldDecorator(
            "type",
            {}
          )(
            <Select
              allowClear={true}
              className="searchstyle"
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
              className="searchstyle"
              placeholder="请选择装潢类型"
            >
              <Option value="标准">标准</Option>
              <Option value="精装">精装</Option>
              <Option value="豪华">豪华</Option>
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(CheckInRecordForm);
