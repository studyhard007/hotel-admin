import React from "react";
import { Table, Button, message } from "antd";
import moment from "moment";
import { RouteComponentProps } from "react-router-dom";
import { FormComponentProps } from "antd/lib/form/Form";
import BillInquirySearch from "../../components/BillInquirySearch";
interface BillInquiryPageProps
  extends RouteComponentProps,
    FormComponentProps {}
export type BillInquiryModal = {
  id?: number;
  type?: string;
  decoration?: string;
  price?: string;
  checkouttime?: number;
  getBillintime?: any;
};
type BillInquiryPageState = {
  collapsed?: boolean;
  list: Array<BillInquiryModal> | null;
};

class BillInquiryPage extends React.Component<BillInquiryPageProps> {
  state: BillInquiryPageState = {
    list: null,
    collapsed: false,
  };
  BillInquirySearchForm: any;
  columns = [
    {
      title: "入账时间",
      key: "checkouttime",
      render(record: BillInquiryModal) {
        return moment.unix(record.checkouttime!).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "入账金额",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "房间类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "装潢类型",
      dataIndex: "decoration",
      key: "decoration",
    },
  ];
  roomform: any;
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/getbillinquirylist")
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
  handleSearchSubmit = () => {
    this.BillInquirySearchForm.props.form.validateFields(
      async (errors: any, values: BillInquiryModal) => {
        console.log(values);
        try {
          fetch("http://localhost:3000/api/v1/findsomebillinquiry", {
            method: "post",
            headers: {
              Accept: "application/json,text/plain, */*",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `start_at=${moment(values.getBillintime![0])
              .startOf("day")
              .unix()}&end_at=${moment(values.getBillintime![1])
              .endOf("day")
              .unix()}`,
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              this.setState({
                list: data.data,
              });
              message.success("查询成功");
            });
        } catch (error) {
          console.log(error);
        }
      }
    );
  };
  render() {
    return (
      <>
        <div className="search">
          <BillInquirySearch
            wrappedComponentRef={(ref: any) => {
              this.BillInquirySearchForm = ref;
            }}
          ></BillInquirySearch>
          <Button
            className="button"
            type="primary"
            onClick={this.handleSearchSubmit}
          >
            查询
          </Button>
        </div>
        <Table
          scroll={{ y: 490 }}
          columns={this.columns}
          dataSource={this.state.list!}
        />
      </>
    );
  }
}

export default BillInquiryPage;
