import React from 'react';
import moment from 'moment';
import { Table, Button, message } from 'antd';
import CheckInRecordForm from '../../components/CheckInRecord';
type CheckInSearchModel = {
  number?: string;
  type?:string;
  price?:string;
  decoration?:string;
  customername?:string;
  customeridcard?:string;
  checkintime?:number;
  checkouttime?:number;
  ischeckout?:boolean;
}
type CheckInSearchPageState = {
  list: Array<CheckInSearchModel> | null
}
class CheckInSearchPage extends React.Component {
  state: CheckInSearchPageState = {
    list: null,
  }
  CheckInRecordForm: any;
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
      title: '入住人姓名',
      key: 'customername',
      dataIndex: 'customername',
    },
    {
      title: '入住人身份证',
      key: 'customeridcard',
      dataIndex: 'customeridcard',
    },
    {
      title: '入住时间',
      key: 'checkintime',
      render(record: CheckInSearchModel) {
        return moment.unix(record.checkintime!).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: '退房时间',
      key: 'checkouttime',
      render(record: CheckInSearchModel) {
        return moment.unix(record.checkouttime!).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: '订单状态',
      key: 'ischeckout',
      render(record: CheckInSearchModel){
        return record.ischeckout ? '已退房' : '未退房';
      }
    },
  ];
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/getallcheckinrecord').then(res => {
      return res.json();
    }).then(data => {
      this.setState({
        list: data.data
      })
    })
  }
  handleSearchSubmit = () => {
    this.CheckInRecordForm.props.form.validateFields(
      async (errors: any, values: CheckInSearchModel) => {
        try {
          fetch('http://localhost:3000/api/v1/searchcheckrecord', {
                      method: 'post',
                      headers: {
                        'Accept': 'application/json,text/plain, */*',
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      body: `type=${values.type}&decoration=${values.decoration}&customername=${String(values.customername)}&customeridcard=${String(values.customeridcard)}`
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
  render() {
    return (
      <>
      <div className='search'>
       <CheckInRecordForm wrappedComponentRef={(ref: any) => {this.CheckInRecordForm = ref}}></CheckInRecordForm>
       <Button className='button' type='primary' onClick={this.handleSearchSubmit}>查询</Button>
      </div>
       <Table scroll={{ y: 500 }} columns={this.columns} dataSource={this.state.list!} />
      </>
    )
  }
}

export default CheckInSearchPage;