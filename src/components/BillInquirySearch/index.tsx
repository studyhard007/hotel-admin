import React from "react";
import { Form, DatePicker } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import "./index.scss";
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
              placeholder={["开始时间", "结束时间"]}
            ></RangePicker>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(CheckInRecordForm);
