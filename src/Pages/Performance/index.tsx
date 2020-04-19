import React from "react";
import { Card } from "antd";
import moment from "moment";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";
import "./index.scss";
type PerformanceModel = {
  price?: number;
  billinquiryin?: string;
};
type PerformanceState = {
  list: Array<PerformanceModel> | null;
};
class Performance extends React.Component {
  state: PerformanceState = {
    list: null,
  };
  titleList = [
    {
      title: "昨日入住数",
      num: 15,
    },
    {
      title: "昨日入账",
      num: 5066,
    },
    {
      title: "当月累计入住数",
      num: 650,
    },
    {
      title: "当月累计入账",
      num: 105550,
    },
  ];
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
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    // const data = [
    //   {
    //     year: "2020-4-11",
    //     checkin: 15,
    //   },
    //   {
    //     year: "2020-4-12",
    //     checkin: 33,
    //   },
    //   {
    //     year: "2020-4-13",
    //     checkin: 10,
    //   },
    //   {
    //     year: "2020-4-14",
    //     checkin: 11,
    //   },
    //   {
    //     year: "2020-4-15",
    //     checkin: 20,
    //   },
    //   {
    //     year: "2020-4-16",
    //     checkin: 33,
    //   },
    //   {
    //     year: "2020-4-17",
    //     checkin: 11,
    //   },
    // ];
    const cols = {
      sales: {
        tickInterval: 100,
      },
      range: [0.2, 0, 8],
    };
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
            // crosshairs用于设置 tooltip 的辅助线或者辅助框
            // crosshairs={{
            //  type: "y"
            // }}
            />
            <Geom type="interval" position="billinquiryin*price" />
          </Chart>
        </Card>
      </div>
    );
  }
}

export default Performance;
