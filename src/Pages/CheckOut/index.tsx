import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import moment from 'moment';
import {RouteComponentProps} from 'react-router-dom';
import {RoomModal} from '../CheckIn/index';
import './index.scss';

type ICheckOutState = {
  data: RoomModal
}
class CheckOutPage extends React.Component<RouteComponentProps> {
  state: ICheckOutState = {
    data: {}
  }
  componentDidMount() {
    let id = Number(this.props.location.search.slice(4));
    try {
      fetch(`http://localhost:3000/api/v1/roomdetail/${id}`).then(res => {
      return res.json();
    }).then(data => {
      this.setState({
        data: data.data
      })
    }).catch(err => {
      console.log(err);
    })
    }catch(error) {
      console.log(error);
    }
  }
  render() {
    const {data} = this.state;
    return (
      <Card className='Card' title="房间入住信息" extra={<Button type='primary'>退房</Button>}>
      <Row>
        <Col span={12}>
          <p>
            <span className='Detaititle'>房间编号:</span>
            <span className='Detailcontent'>
              {data.number}
            </span>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <span className='Detaititle'>房间类型:</span>
            <span className='Detailcontent'>
              {data.type}
            </span>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <span className='Detaititle'>房间装潢:</span>
            <span className='Detailcontent'>
              {data.decoration}
            </span>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <span className='Detaititle'>房间状态:</span>
            <span className='Detailcontent'>
              {data.isfree === 'true' ? '空闲' : '入住中'}
            </span>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <span className='Detaititle'>房间价格:</span>
            <span className='Detailcontent'>
              {data.price}元/晚
            </span>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <span className='Detaititle'>已交押金:</span>
            <span className='Detailcontent'>
              {data.deposit}元
            </span>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <span className='Detaititle'>房间介绍:</span>
            <span className='Detailcontent'>
              {data.introduction}
            </span>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <span className='Detaititle'>入住人姓名:</span>
            <span className='Detailcontent'>
              {data.customername}
            </span>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <span className='Detaititle'>入住人身份证:</span>
            <span className='Detailcontent'>
              {data.customeridcard}
            </span>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <span className='Detaititle'>入住时间:</span>
            <span className='Detailcontent'>
              {moment.unix(data.checkintime!).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <span className='Detaititle'>预计退房时间:</span>
            <span className='Detailcontent'>
              {moment.unix(data.checkouttime!).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </p>
        </Col>
      </Row>
    </Card>
    );
  }
}

export default CheckOutPage;