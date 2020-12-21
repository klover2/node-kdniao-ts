## 快递鸟

## 安装
`yarn add node-kdniao 或者 npm i node-kdniao --save`
## 使用

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

## 文档
[快递鸟api](http://www.kdniao.com/api-track)