import React from 'react';
import { Table, Tag, Modal, Button } from 'antd';
import {RouteComponentProps} from 'react-router-dom'
import { FormComponentProps } from "antd/lib/form/Form";
import RoomForm from '../../components/AddRoom';

interface CustomerPageProps extends RouteComponentProps, FormComponentProps {}
type RoomModal = {
  roomtype?: string;
  number?:string;
  price?:string;
  introduction?:string;
}
type RoomPageState = {
  visible: boolean;
  collapsed?:boolean;
  list: Array<RoomModal> | null
}
const columns = [
    {
      title: '房间类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '身份证号',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any[]) => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: { name: React.ReactNode; }) => (
        <span>
          {/* <a>Invite {record.name}</a>
          <Divider type="vertical" />
          <a>Delete</a> */}
        </span>
      ),
    },
  ];
const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
class Room extends React.Component<CustomerPageProps> {
    
    state: RoomPageState = {
        visible:false,
        list: null,
        collapsed: false
    };
    roomform: any;
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    toggleAddRoomModal = () => {
      this.setState({
        visible: !this.state.visible
      })
    }
    render() {
        return (
          <>
            <Modal 
             title='录入客房信息'
             visible={this.state.visible}
             onCancel={() => {
               this.setState({
                 visible: !this.state.visible
               });
               this.roomform.props.form.resetFields();
             }}
             onOk={() => {
              this.roomform.props.form.validateFields(
                async (error: any, values: RoomModal) => {
                  if(error){
                    return;
                  }
                  try{
                    console.log(values);
                  }catch(err) {
                    console.log(err);
                  }    
                this.setState({
                  visible: !this.state.visible
                });
              })
              this.roomform.props.form.resetFields();
             }}
             >
               <RoomForm wrappedComponentRef={(inst: any) => {this.roomform = inst}}></RoomForm>
             </Modal>
             <Button type='primary' onClick={this.toggleAddRoomModal.bind(this)}>录入客房信息</Button>
            <Table columns={columns} dataSource={data} />
          </>
        );
    }
}

export default Room;