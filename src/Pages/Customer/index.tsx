import React from "react";
import { Table, Modal, Button, message } from "antd";
// import {toJS} from 'mobx';
import { RouteComponentProps } from "react-router-dom";
import { FormComponentProps } from "antd/lib/form/Form";
import CustomerForm from "../../components/AddCustomer";

interface CustomerPageProps extends RouteComponentProps, FormComponentProps {}
type CustomerModel = {
  id?: number;
  phone?: string;
  password?: string;
  issuper?: boolean;
};
type CustomerPageState = {
  visible: boolean;
  collapsed?: boolean;
  list: Array<CustomerModel> | null;
};

class Customer extends React.Component<CustomerPageProps> {
  columns = [
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "操作",
      key: "action",
      render: (text: any, record: CustomerModel) => (
        <Button
          disabled={record.issuper ? true : false}
          type="link"
          onClick={async () => {
            fetch("http://localhost:3000/api/v1/deletecustomer", {
              method: "post",
              headers: {
                Accept: "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `id=${record.id}`,
            })
              .then((response) => {
                message.success("删除成功");
                fetch("http://localhost:3000/api/v1/getcustomerlist")
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    this.setState({
                      list: data.data,
                    });
                  });
                return response.json();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          删除
        </Button>
      ),
    },
  ];
  state: CustomerPageState = {
    visible: false,
    collapsed: false,
    list: null,
  };
  customerform: any;
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/getcustomerlist")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          list: data.data,
        });
      });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  toggleAddCustomerModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  render() {
    return (
      <>
        <Modal
          title="添加普通管理员"
          okText="保存"
          cancelText="取消"
          visible={this.state.visible}
          onCancel={() => {
            this.setState({
              visible: !this.state.visible,
            });
            this.customerform.props.form.resetFields();
          }}
          onOk={() => {
            this.customerform.props.form.validateFields(
              async (errors: any, values: CustomerModel) => {
                if (errors) {
                  return;
                }
                try {
                  fetch("http://localhost:3000/api/v1/addcustomer", {
                    method: "post",
                    headers: {
                      Accept: "application/json,text/plain, */*",
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `phone=${values.phone}&password=${values.password}`,
                  })
                    .then((response) => {
                      message.success("录入管理员成功");
                      this.setState({
                        visible: !this.state.visible,
                      });
                      fetch("http://localhost:3000/api/v1/getcustomerlist")
                        .then((res) => {
                          return res.json();
                        })
                        .then((data) => {
                          this.setState({
                            list: data.data,
                          });
                        });
                      this.customerform.props.form.resetFields();
                      return response.json();
                    })
                    .then((data) => {
                      console.log(data);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                } catch (err) {
                  message.error("添加普通管理员失败");
                }
              }
            );
          }}
        >
          <CustomerForm
            wrappedComponentRef={(inst: any) => {
              this.customerform = inst;
            }}
          ></CustomerForm>
        </Modal>
        <Button type="primary" onClick={this.toggleAddCustomerModal.bind(this)}>
          添加普通管理员
        </Button>
        <Table
          scroll={{ y: 490 }}
          columns={this.columns}
          dataSource={this.state.list!}
        />
      </>
    );
  }
}

export default Customer;
