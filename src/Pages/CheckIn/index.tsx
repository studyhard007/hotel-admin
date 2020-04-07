import React from 'react';
import { Table, Button, message, Modal } from 'antd';
import {RouteComponentProps} from 'react-router-dom';
import moment from 'moment';
import { FormComponentProps } from "antd/lib/form/Form";
import CheckInSearchForm from '../../components/CheckInSearch';
import CheckInMessageForm from '../../components/CheckInMessage';
import './index.scss';

interface CheckInPageProps extends RouteComponentProps, FormComponentProps {}
type CheckInMessageModel = {
  customername: string;
  customeridcard: string;
  checkintime?: number;
  checkouttime: number;
  deposit: number;
  isfree?: string;
}
export type RoomModal = {
  id?:number;
  number?: string;
  type?:string;
  price?:string;
  decoration?:string;
  introduction?:string;
  customername?:string;
  customeridcard?:string;
  checkintime?:number;
  checkouttime?:number;
  deposit?:number;
  createdAt?: string;
  updatedAt?:string;
  isfree?: string | boolean;
}
type CheckInPageState = {
  id: number;
  visible: boolean;
  collapsed?:boolean;
  list: Array<RoomModal> | null
}

class CheckInPage extends React.Component<CheckInPageProps> {
    
    state: CheckInPageState = {
        id: 0,
        visible:false,
        list: null,
        collapsed: false
    };
    CheckInSearchForm: any;
    CheckInMessageForm: any;
    columns = [
      {
        title: '房间编号',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: '房间类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '房间装潢',
        key: 'decoration',
        dataIndex: 'decoration',
      },
      {
        title: '房间状态',
        key: 'isfree',
        render: (text: any, record: RoomModal) => {
          if(record.isfree === 'true') {
            return '空闲';
          }else if(record.isfree === 'false') {
            return '入住中';
          }
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: RoomModal) => (
          <Button type='link' onClick={async () => {
            if(record.isfree === 'true') {
              this.setState({
                id: record.id
              })
              this.toggleCheckInMessageModal();
            }else {
              this.props.history.push({
                pathname: '/app/checkout',
                search: `id=${record.id}`
              })
            }
          }}>{record.isfree === 'true' ? '办理入住' : '退房'}</Button>
        ),
      },
    ];

    componentDidMount() {
      fetch('http://localhost:3000/api/v1/getroomlist').then(res => {
        return res.json();
      }).then(data => {
        this.setState({
          list: data.data
        })
      })
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    handleSearchSubmit = () => {
      this.CheckInSearchForm.props.form.validateFields(
        async (errors: any, values: RoomModal) => {
          if(values.isfree === 'true') {
            values.isfree = true;
          } else if (values.isfree === 'false') {
            values.isfree = false;
          }
          if(errors) {
            return;
          }
          try {
            const bodysearch = [];
            if(values.type) {
              bodysearch.push(`type=${values.type}`)
            }
            if(values.decoration) {
              bodysearch.push(``)
            }
            fetch('http://localhost:3000/api/v1/searchroom', {
                        method: 'post',
                        headers: {
                          'Accept': 'application/json,text/plain, */*',
                          'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `type=${values.type}&decoration=${values.decoration}&isfree=${values.isfree}`
                      }).then(res => {
                        return res.json();
                      }).then(data => {
                        this.setState({
                          list: data.data
                        })
                        message.success('查询成功')
                      })
          }catch(err) {
            console.log(err)
          }
        }
      )
    }
    toggleCheckInMessageModal = () => {
      this.setState({
        visible: !this.state.visible
      })
    }
    render() {
        return (
          <>
            <div className='search'> 
            <CheckInSearchForm wrappedComponentRef={(inst: any) => {this.CheckInSearchForm = inst}}></CheckInSearchForm>
            <Button className='button' type='primary' onClick={this.handleSearchSubmit}>查询</Button>
            </div>
            <Table scroll={{ y: 500 }} columns={this.columns} dataSource={this.state.list!} />
            <Modal
            title='入住信息登记'
            okText='确定'
            cancelText='取消'
            visible={this.state.visible}
            onOk={() => {
              this.CheckInMessageForm.props.form.validateFields(
                async (errors: any, values: CheckInMessageModel) => {
                  if(errors) {
                    return;
                  }
                  try {
                    fetch('http://localhost:3000/api/v1/roomcheckin',{
                      method: 'post',
                      headers: {
                          'Accept': 'application/json,text/plain, */*',
                          'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      body: `id=${this.state.id}&customername=${values.customername}&customeridcard=${values.customeridcard}&checkouttime=${moment(values.checkouttime).hour(12).minute(0).second(0).unix()}&isfree=${'false'}&deposit=${values.deposit}`
                    }).then((response) => {
                      message.success('登记成功');
                      this.setState({
                        visible: !this.state.visible
                      });
                      fetch('http://localhost:3000/api/v1/getroomlist').then(res => {
                        return res.json()
                      }).then(data => {
                        this.setState({
                          list:data.data
                        })
                      })
                    }).then(data => {
                      console.log(data);
                    }).catch(function (err) {
                      console.log(err);
                    })
                  }catch(error) {
                    console.log(error);
                  }
                  this.CheckInMessageForm.props.form.resetFields();
                }
              )

            }}
            onCancel={() => {
              this.CheckInMessageForm.props.form.resetFields();
              this.toggleCheckInMessageModal();
            }}
            >
              <CheckInMessageForm wrappedComponentRef={(inst: any) => {this.CheckInMessageForm = inst}}></CheckInMessageForm>
            </Modal>
          </>
        );
    }
}

export default CheckInPage;