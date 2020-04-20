import React from "react";
import { Card } from "antd";
import moment from "moment";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";
import { BillInquiryModal } from "../BillInquiry/index";
import "./index.scss";

type PerformanceModel = {
  price?: number;
  billinquiryin?: string;
};
type PerformanceState = {
  list: Array<PerformanceModel> | null;
  _listofday: Array<BillInquiryModal> | null;
  _listofmonth: Array<BillInquiryModal> | null;
  lastbillin: number;
  lastbillinofmonth: number;
};
class Performance extends React.Component {
  state: PerformanceState = {
    list: null,
    _listofday: null,
    _listofmonth: null,
    lastbillin: 0,
    lastbillinofmonth: 0
  };
  titleList = [
    {
      title: "昨日入住数",
      num: "0",
    },
    {
      title: "昨日入账",
      num: "0",
    },
    {
      title: "当月累计入住数",
      num: "0",
    },
    {
      title: "当月累计入账",
      num: "0",
    },
  ];
lastbillin = 0;
lastbillinofmonth = 0;
  componentDidMount() {
    try {
      fetch("http://localhost:3000/api/v1/getperformance", {
        method: "post",
        headers: {
          Accept: "application/json,text/plain, */*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `start_at=${moment()
          .add(-7, "day")
          .format("YYYYMMDD")}&end_at=${moment()
          .add(-1, "day")
          .format("YYYYMMDD")}`,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.setState({
            list: data.data,
          });
        });
      fetch("http://localhost:3000/api/v1/getperformance", {
        method: "post",
        headers: {
          Accept: "application/json,text/plain, */*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `start_at=${moment()
          .add(-1, "day")
          .startOf("day")
          .format("YYYYMMDD")}&end_at=${moment()
          .add(-1, "day")
          .endOf("day")
          .format("YYYYMMDD")}`,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          data.data.forEach((item: PerformanceModel) => {
            this.lastbillin += item.price!
          })
          this.setState({
            lastbillin: this.lastbillin,
            listofday: data.data,
          });
        });
      fetch("http://localhost:3000/api/v1/getperformance", {
        method: "post",
        headers: {
          Accept: "application/json,text/plain, */*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `start_at=${moment()
          .add(-30, "day")
          .format("YYYYMMDD")}&end_at=${moment()
          .add(-1, "day")
          .format("YYYYMMDD")}`,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          data.data.forEach((item: PerformanceModel) => {
            this.lastbillinofmonth += item.price!
          })
          this.setState({
            lastbillinofmonth: this.lastbillinofmonth,
            listofmonth: data.data,
          });
        });
      fetch("http://localhost:3000/api/v1/findsomebillinquiry", {
        method: "post",
        headers: {
          Accept: "application/json,text/plain, */*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `start_at=${moment()
          .add(-1, "day")
          .startOf("day")
          .unix()}&end_at=${moment().add(-1, "day").endOf("day").unix()}`,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.setState({
            _listofday: data.data,
          });
        });
      fetch("http://localhost:3000/api/v1/findsomebillinquiry", {
        method: "post",
        headers: {
          Accept: "application/json,text/plain, */*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `start_at=${moment()
          .add(-30, "day")
          .startOf("day")
          .unix()}&end_at=${moment().add(-1, "day").endOf("day").unix()}`,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.setState({
            _listofmonth: data.data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { lastbillin, lastbillinofmonth, _listofday, _listofmonth } = this.state;
    const cols = {
      sales: {
        tickInterval: 100,
      },
      range: [0.2, 0, 8],
    };
    this.titleList = [
      {
        title: "昨日入住数",
        num: `${_listofday && _listofday.length}`,
      },
      {
        title: "昨日入账",
        num: `${lastbillin}`,
      },
      {
        title: "当月累计入住数",
        num: `${_listofmonth && _listofmonth.length}`,
      },
      {
        title: "当月累计入账",
        num: `${lastbillinofmonth}`,
      },
    ];
    return (
      <div className="performance">
        <div className="top">
          {this.titleList.map((v) => (
            <div key={v.title} className="top__content">
              <div className="top__content--title">{v.title}</div>
              <div className="top__content--num">{v.num}</div>
            </div>
          ))}
        </div>
        <Card title="酒店入住业绩">
          <Chart height={450} data={this.state.list} scale={cols} forceFit>
            <Axis name="billinquiryin" />
            <Axis name="price" />
            <Tooltip
            />
            <Geom type="interval" position="billinquiryin*price" />
          </Chart>
        </Card>
      </div>
    );
  }
}

export default Performance;
