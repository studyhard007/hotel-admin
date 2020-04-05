import React from 'react';
import { Table, Button } from 'antd';
import {RouteComponentProps} from 'react-router-dom'
import { FormComponentProps } from "antd/lib/form/Form";
import CheckInSearchForm from '../../components/CheckInSearch';
import './index.scss';

interface CheckInPageProps extends RouteComponentProps, FormComponentProps {}
type RoomModal = {
  id?:number;
  number?: string;
  type?:string;
  price?:string;
  decoration?:string;
  introduction?:string;
}
type CheckInPageState = {
  visible: boolean;
  collapsed?:boolean;
  list: Array<RoomModal> | null
}

class CheckInPage extends React.Component<CheckInPageProps> {
    
    state: CheckInPageState = {
        visible:false,
        list: null,
        collapsed: false
    };
    CheckInSearchForm: any;
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
      // {
      //   title: '操作',
      //   key: 'action',
      //   render: (text: any, record: RoomModal) => (
      //     <Button type='link' onClick={async () => {
      //       fetch('http://localhost:3000/api/v1/deleteroom', {
      //         method: 'post',
      //         headers: {
      //           'Accept': 'application/json,text/plain, */*',
      //           'Content-Type': 'application/x-www-form-urlencoded'
      //         },
      //         body: `id=${record.id}`
      //       }).then((response) => {
      //         message.success('删除成功')
      //         fetch('http://localhost:3000/api/v1/getcustomerlist').then(res => {
      //           return res.json()
      //         }).then(data => {
      //           this.setState({
      //             list:data.data
      //           })
      //         })
      //         return response.json();
      //       }).catch((err) => {
      //         console.log(err)
      //       });
      //     }}>删除</Button>
      //   ),
      // },
    ];
    roomform: any;
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
    // toggleAddRoomModal = () => {
    //   this.setState({
    //     visible: !this.state.visible
    //   })
    // }
    render() {
        return (
          <>
            <div className='search'> 
            <CheckInSearchForm wrappedComponentRef={(inst: any) => {this.CheckInSearchForm = inst}}></CheckInSearchForm>
            <Button className='button' type='primary'>查询</Button>
            </div>
            <Table columns={this.columns} dataSource={this.state.list!} />
          </>
        );
    }
}

export default CheckInPage;