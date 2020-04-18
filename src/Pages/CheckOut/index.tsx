import React from "react";
import { Card, Row, Col, Button, Modal, message } from "antd";
import moment from "moment";
import { RouteComponentProps } from "react-router-dom";
import { RoomModal } from "../CheckIn/index";
import "./index.scss";

type ICheckOutState = {
  roomid?: number;
  data: RoomModal;
  visible: boolean;
};
class CheckOutPage extends React.Component<RouteComponentProps> {
  state: ICheckOutState = {
    visible: false,
    data: {},
  };
  componentDidMount() {
    let id = Number(this.props.location.search.slice(4));
    try {
      fetch(`http://localhost:3000/api/v1/roomdetail/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.setState({
            data: data.data,
            roomid: id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
  toggleModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  render() {
    const { data, visible } = this.state;
    return (
      <>
        <Card
          className="Card"
          title="房间入住信息"
          extra={
            <Button type="primary" onClick={this.toggleModal}>
              退房
            </Button>
          }
        >
          <Row>
            <Col span={12}>
              <p>
                <span className="Detaititle">房间编号:</span>
                <span className="Detailcontent">{data.number}</span>
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span className="Detaititle">房间类型:</span>
                <span className="Detailcontent">{data.type}</span>
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span className="Detaititle">房间装潢:</span>
                <span className="Detailcontent">{data.decoration}</span>
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span className="Detaititle">房间状态:</span>
                <span className="Detailcontent">
                  {data.isfree === "true" ? "空闲" : "入住中"}
                </span>
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span className="Detaititle">房间价格:</span>
                <span className="Detailcontent">{data.price}元/晚</span>
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span className="Detaititle">已交押金:</span>
                <span className="Detailcontent">{data.deposit}元</span>
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span className="Detaititle">房间介绍:</span>
                <span className="Detailcontent">{data.introduction}</span>
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span className="Detaititle">入住人姓名:</span>
                <span className="Detailcontent">{data.customername}</span>
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span className="Detaititle">入住人身份证:</span>
                <span className="Detailcontent">{data.customeridcard}</span>
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span className="Detaititle">入住时间:</span>
                <span className="Detailcontent">
                  {moment.unix(data.checkintime!).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span className="Detaititle">预计退房时间:</span>
                <span className="Detailcontent">
                  {moment
                    .unix(data.checkouttime!)
                    .format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </p>
            </Col>
          </Row>
        </Card>
        <Modal
          title="办理退房"
          okText="确定"
          cancelText="取消"
          visible={visible}
          onOk={() => {
            fetch("http://localhost:3000/api/v1/article", {
              method: "post",
              headers: {
                Accept: "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `type=${this.state.data.type!}&price=${
                this.state.data.price
              }&checkouttime=${moment().unix()}&decoration=${
                this.state.data.decoration
              }`,
            }).then((res) => {
              return res.json();
            });
            fetch("http://localhost:3000/api/v1/checkinrecord", {
              method: "post",
              headers: {
                Accept: "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `customeridcard=${this.state.data
                .customeridcard!}&ischeckout=${true}&id=${
                this.state.roomid
              }&isfree=${"true"}`,
            }).then((res) => {
              return res.json();
            });
            message.success("退房成功");
            this.props.history.push('/app/checkinsearch');
            this.toggleModal();
          }}
          onCancel={() => {
            this.toggleModal();
          }}
        >
          <Row>
            <Col span={24}>
              <p>
                <span className="Detaititle">退还押金:</span>
                <span className="Detailcontent">{data.deposit}</span>
              </p>
            </Col>
            <Col span={24}>
              <p>
                <span className="Detaititle">预计退房时间:</span>
                <span className="Detailcontent">
                  {moment
                    .unix(data.checkouttime!)
                    .format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </p>
            </Col>
          </Row>
        </Modal>
      </>
    );
  }
}

export default CheckOutPage;
