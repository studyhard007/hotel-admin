import React from 'react';
import { Table, Modal, Button, message } from 'antd';
// import {toJS} from 'mobx';
import {RouteComponentProps} from 'react-router-dom'
import { FormComponentProps } from "antd/lib/form/Form";
import CustomerForm from '../../components/AddCustomer';

interface CustomerPageProps extends RouteComponentProps, FormComponentProps {}
type CustomerModel = {
  name: string;
  gender?: string;
  age?: string;
  idcard?: string;
}
type CustomerPageState ={
  visible: boolean;
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
        visible: false,
        collapsed: false,
        list: null
    }
   customerform: any;
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
    toggleAddCustomerModal = () => {
      this.setState({
        visible: !this.state.visible
      })
    }
    render () {
            return (
              <>
                <Modal
                title='顾客信息录入'
                okText='保存'
                cancelText="取消"
                visible={this.state.visible}
                onCancel={() => {
                  this.setState({
                    visible: !this.state.visible
                  });
                  this.customerform.props.form.resetFields();
                }}
                onOk={() => {
                  console.log(this.customerform.props.form.getFieldsValue());
                  this.customerform.props.form.validateFields(
                    async (errors: any, values: CustomerModel) => {
                      if(errors) {
                        return;
                      }
                    try {
                      fetch('http://localhost:3000/api/v1/addcustomer', {
                        method: 'post',
                        headers: {
                          'Accept': 'application/json,text/plain, */*',
                          'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `name=${values.name}&gender=${values.gender}&age=${values.age}&idcard=${values.idcard}`
                      }).then((resopnse) => {
                        message.success('录入顾客信息成功');
                        this.setState({
                          visible: !this.state.visible
                        })
                        fetch('http://localhost:3000/api/v1/getcustomerlist').then(res => {
                          return res.json()
                        }).then(data => {
                          this.setState({
                            list:data.data
                          })
                        })
                        this.customerform.props.form.resetFields();
                        return resopnse.json()
                      }).then((data) => {
                        console.log(data)
                      }).catch(function(error){
                        console.log(error)
                      })
                    }catch(err) {
                      message.error('录入顾客信息失败');
                    }
                    }
                  )
                  // this.setState({
                  //   visible: !this.state.visible
                  // });
                }}
                >
                  <CustomerForm wrappedComponentRef={(inst: any) => {this.customerform = inst}}></CustomerForm>
                </Modal>
                <Button onClick={this.toggleAddCustomerModal.bind(this)}>录入顾客信息</Button>
                <Table columns={columns} dataSource={this.state.list!}/>
              </>
            );
    }
}

export default Customer;