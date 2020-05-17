import React from "react";
import moment from "moment";
import XLSX from "xlsx";
import { Table, Button, message } from "antd";
import CheckInRecordForm from "../../components/CheckInRecord";
type CheckInSearchModel = {
  number?: string;
  type?: string;
  price?: string;
  decoration?: string;
  customername?: string;
  customeridcard?: string;
  checkintime?: number;
  checkouttime?: number;
  ischeckout?: boolean;
};
type CheckInSearchPageState = {
  list: Array<CheckInSearchModel> | null;
};
class CheckInSearchPage extends React.Component {
  state: CheckInSearchPageState = {
    list: null,
  };
  CheckInRecordForm: any;
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
      title: "入住人姓名",
      key: "customername",
      dataIndex: "customername",
    },
    {
      title: "入住人身份证",
      key: "customeridcard",
      width: "200px",
      dataIndex: "customeridcard",
    },
    {
      title: "入住时间",
      key: "checkintime",
      render(record: CheckInSearchModel) {
        return moment.unix(record.checkintime!).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "退房时间",
      key: "checkouttime",
      render(record: CheckInSearchModel) {
        return moment.unix(record.checkouttime!).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "订单状态",
      key: "ischeckout",
      render(record: CheckInSearchModel) {
        return record.ischeckout ? "已退房" : "未退房";
      },
    },
  ];
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/getallcheckinrecord")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          list: data.data,
        });
      });
  }
  handleSearchSubmit = () => {
    this.CheckInRecordForm.props.form.validateFields(
      async (errors: any, values: CheckInSearchModel) => {
        try {
          fetch("http://localhost:3000/api/v1/searchcheckrecord", {
            method: "post",
            headers: {
              Accept: "application/json,text/plain, */*",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `type=${values.type}&decoration=${
              values.decoration
            }&customername=${String(
              values.customername
            )}&customeridcard=${String(values.customeridcard)}`,
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
        } catch (err) {
          console.log(err);
        }
      }
    );
  };
  render() {
    const initColumn = [
      {
        title: "房间编号",
        dataIndex: "number",
        key: "number",
        className: "text-monospace",
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
        dataIndex: "decoration",
        key: "decoration",
      },
      {
        title: "入住人姓名",
        dataIndex: "customername",
        key: "customername",
      },
      {
        title: "入住人身份证",
        dataIndex: "customeridcard",
        key: "customeridcard",
      },
      {
        title: "入住时间",
        dataIndex: "checkintime",
        key: "checkintime",
      },
      {
        title: "退房时间",
        dataIndex: "checkouttime",
        key: "checkouttime",
      },
      {
        title: "订单状态",
        dataIndex: "ischeckout",
        key: "ischeckout",
      },
    ];
    return (
      <>
        <div className="search">
          <CheckInRecordForm
            wrappedComponentRef={(ref: any) => {
              this.CheckInRecordForm = ref;
            }}
          ></CheckInRecordForm>
          <Button
            className="button"
            type="primary"
            onClick={this.handleSearchSubmit}
          >
            查询
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            className="button"
            onClick={() => {
              const _headers = initColumn
                .map((item: any, i: any) =>
                  Object.assign(
                    {},
                    {
                      key: item.key,
                      title: item.title,
                      position: String.fromCharCode(65 + i) + 1,
                    }
                  )
                )
                .reduce(
                  (prev: any, next: any) =>
                    Object.assign({}, prev, {
                      [next.position]: { key: next.key, v: next.title },
                    }),
                  {}
                );
              const data = this.state && this.state.list;
              data!.forEach((item) => {
                //@ts-ignore
                item.checkintime = moment
                  .unix(item.checkintime!)
                  .format("YYYY-MM-DD HH:mm:ss");
                //@ts-ignore
                item.checkouttime = moment
                  .unix(item.checkouttime!)
                  .format("YYYY-MM-DD HH:mm:ss");
                //@ts-ignore
                item.ischeckout = item.ischeckout ? "已退房" : "未退房";
              });
              const _data = data!
                .map((item: any, i: any) =>
                  initColumn.map((key: any, j: any) =>
                    Object.assign(
                      {},
                      {
                        content: item[key.key],
                        position: String.fromCharCode(65 + j) + (i + 2),
                      }
                    )
                  )
                )
                // 对刚才的结果进行降维处理（二维数组变成一维数组）
                .reduce((prev: any, next: any) => prev.concat(next))
                // 转换成 worksheet 需要的结构
                .reduce(
                  (prev: any, next: any) =>
                    Object.assign({}, prev, {
                      [next.position]: { v: next.content },
                    }),
                  {}
                );

              // 合并 headers 和 data
              const output = Object.assign({}, _headers, _data);
              // 获取所有单元格的位置
              const outputPos = Object.keys(output);
              // 计算出范围 ,["A1",..., "H2"]
              const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

              // 构建 workbook 对象
              const wb = {
                SheetNames: ["mySheet"],
                Sheets: {
                  mySheet: Object.assign({}, output, {
                    "!ref": ref,
                    "!cols": [
                      { wpx: 45 },
                      { wpx: 100 },
                      { wpx: 200 },
                      { wpx: 80 },
                      { wpx: 150 },
                      { wpx: 100 },
                      { wpx: 300 },
                      { wpx: 300 },
                    ],
                  }),
                },
              };

              // 导出 Excel
              XLSX.writeFile(wb, "入住记录表.xlsx");
            }}
          >
            导出
          </Button>
        </div>
        <Table
          scroll={{ y: 490 }}
          columns={this.columns}
          dataSource={this.state && this.state.list!}
        />
      </>
    );
  }
}

export default CheckInSearchPage;
