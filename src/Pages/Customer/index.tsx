import React from 'react';
import { Table, Form } from 'antd';
// import {toJS} from 'mobx';
import {RouteComponentProps} from 'react-router-dom'
import { FormComponentProps } from "antd/lib/form/Form";

interface CustomerPageProps extends RouteComponentProps, FormComponentProps {}
type CustomerModel = {
  name: string;
  gender?: string;
  age?: string;
  idcard?: string;
}
type CustomerPageState ={
  collapsed?: boolean;
  list: Array<CustomerModel> | null;
}
const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '身份证号',
      key: 'idcard',
      dataIndex: 'idcard'
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
class Customer extends React.Component<CustomerPageProps> {
    state: CustomerPageState = {
        collapsed: false,
        list: null
    }
    componentDidMount() {
       fetch('http://localhost:3000/api/v1/getcustomerlist').then(res => {
         return res.json()
       }).then(data => {
         this.setState({
           list:data.data
         })
       })
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render () {
            return (
                <Table columns={columns} dataSource={this.state.list!}/>
            );
    }
}

export default Form.create()(Customer);