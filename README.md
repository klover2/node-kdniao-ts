## 快递鸟

## 安装
`yarn add node-kdniao 或者 npm i node-kdniao --save`
## 使用
1. 基本接口调用
```bash
import Kdniao from 'node-kdniao'; 或者 const Kdniao = require('node-kdniao')
const kdniao = new Kdniao({
  EBusinessID: '商户ID',
  key: '商户key',
});

const result = await kdniao.allApi({
    type: '1002', // 请求指令类型
    params: { // 接口参数 参考快递鸟文档
      ShipperCode: 'YD',  // 快递编号
      LogisticCode: '快递号',
    },
    url: 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx', // 请求接口
  });
```
2.  [物流轨迹地图页嵌入](http://www.kdniao.com/api-MapTrackInsert)
```bash
const url = await kdniao.trackMap({
    type: '8003', // 对应参数文档 http://www.kdniao.com/api-MapTrack
    params: {
      ShipperCode: 'YTO',
      LogisticCode: '快递号',
      SenderCityName: '南通市',
      ReceiverCityName: '杭州市',
      IsReturnCoordinates: 1,
      IsReturnRouteMap: 1,
    },
  });
```
## 文档
[快递鸟api](http://www.kdniao.com/api-track)
[快递鸟api使用情况](http://www.kdniao.com/membership)