import React from "react";
import { Table, Modal, Button, message } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { FormComponentProps } from "antd/lib/form/Form";
import RoomForm from "../../components/AddRoom";

interface CustomerPageProps extends RouteComponentProps, FormComponentProps {}
type RoomModal = {
  id?: number;
  number?: string;
  type?: string;
  price?: string;
  decoration?: string;
  introduction?: string;
};
type RoomPageState = {
  visible: boolean;
  collapsed?: boolean;
  list: Array<RoomModal> | null;
};

class Room extends React.Component<CustomerPageProps> {
  state: RoomPageState = {
    visible: false,
    list: null,
    collapsed: false,
  };
  columns = [
    {
      title: "房间编号",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "房间类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "房间装潢",
      key: "decoration",
      dataIndex: "decoration",
    },
    {
      title: "操作",
      key: "action",
      render: (text: any, record: RoomModal) => (
        <Button
          type="link"
          onClick={async () => {
            fetch("http://localhost:3000/api/v1/deleteroom", {
              method: "post",
              headers: {
                Accept: "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `id=${record.id}`,
            })
              .then((response) => {
                message.success("删除成功");
                fetch("http://localhost:3000/api/v1/getroomlist")
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    this.setState({
                      list: data.data,
                    });
                  });
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
  roomform: any;
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/getroomlist")
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
  toggleAddRoomModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  render() {
    return (
      <>
        <Modal
          title="录入客房信息"
          okText="保存"
          cancelText="取消"
          visible={this.state.visible}
          onCancel={() => {
            this.setState({
              visible: !this.state.visible,
            });
            this.roomform.props.form.resetFields();
          }}
          onOk={() => {
            this.roomform.props.form.validateFields(
              async (error: any, values: RoomModal) => {
                if (error) {
                  return;
                }
                try {
                  fetch("http://localhost:3000/api/v1/createroom", {
                    method: "post",
                    headers: {
                      Accept: "application/json,text/plain, */*",
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `number=${values.number}&type=${values.type}&price=${values.price}&decoration=${values.decoration}&introduction=${values.introduction}`,
                  })
                    .then((response) => {
                      message.success("录入房间信息成功");
                      this.setState({
                        visible: !this.state.visible,
                      });
                      fetch("http://localhost:3000/api/v1/getroomlist")
                        .then((res) => {
                          return res.json();
                        })
                        .then((data) => {
                          this.setState({
                            list: data.data,
                          });
                        });
                    })
                    .then((data) => {
                      console.log(data);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                } catch (err) {
                  console.log(err);
                  message.error("录入房间信息失败");
                }
              }
            );
            this.roomform.props.form.resetFields();
          }}
        >
          <RoomForm
            wrappedComponentRef={(inst: any) => {
              this.roomform = inst;
            }}
          ></RoomForm>
        </Modal>
        <Button type="primary" onClick={this.toggleAddRoomModal.bind(this)}>
          录入客房信息
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

export default Room;
