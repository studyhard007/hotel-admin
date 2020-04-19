import React from "react";
import { Card } from "antd";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";
import "./index.scss";

//  type PerformanceState = {
//    list: 
//  }
class Performance extends React.Component {
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
  
  }
  render() {
    const data = [
      {
        year: "2020-4-11",
        checkin: 15,
      },
      {
        year: "2020-4-12",
        checkin: 33,
      },
      {
        year: "2020-4-13",
        checkin: 10,
      },
      {
        year: "2020-4-14",
        checkin: 11,
      },
      {
        year: "2020-4-15",
        checkin: 20,
      },
      {
        year: "2020-4-16",
        checkin: 33,
      },
      {
        year: "2020-4-17",
        checkin: 11,
      },
    ];
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
          <Chart height={450} data={data} scale={cols} forceFit>
            <Axis name="year" />
            <Axis name="checkin" />
            <Tooltip
            // crosshairs用于设置 tooltip 的辅助线或者辅助框
            // crosshairs={{
            //  type: "y"
            // }}
            />
            <Geom type="interval" position="year*checkin" />
          </Chart>
        </Card>
      </div>
    );
  }
}

export default Performance;
