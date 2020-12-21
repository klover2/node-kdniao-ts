'use strict';
import crypto from 'crypto';
import superagent from 'superagent';
import {IKdniao, IParams, IAllApi} from './lib/config';

class Kdniao {
  private EBusinessID: string;
  private DataType = '2';
  private key: string;
  constructor(obj: IKdniao) {
    this.EBusinessID = obj.EBusinessID;
    this.key = obj.key;
  }
  // 不支持物流轨迹地图页嵌入
  public async allApi(obj: IAllApi): Promise<object> {
    return await this.init(obj.type, obj.params, obj.url);
  }
  // 物流轨迹地图页嵌入 RequestData 的参数 请看http://www.kdniao.com/api-MapTrack
  public trackMap(obj: IParams): string {
    let RequestType = '8003';
    if (obj.type) RequestType = obj.type;
    const Timestamp = +new Date() + '';

    const RequestData = JSON.stringify({
      ...obj.params,
      Timestamp,
      RequestType,
    });

    const DataSign = this.getSign(RequestData, Timestamp);
    return `https://api.kdniao.com/gateway/routeMap?DataSign=${DataSign}&RequestData=${encodeURIComponent(
      RequestData
    )}&EBusinessID=${this.EBusinessID}&Timestamp=${Timestamp}`;
  }
  // 参数初始化
  protected async init(RequestType: string, params: object, url: string): Promise<object> {
    const RequestData = JSON.stringify(params);
    const DataSign = this.getSign(RequestData);
    return await this.request(encodeURIComponent(RequestData), DataSign, RequestType, url);
  }
  // 加密
  private getSign(params: string, Timestamp?: string): string {
    const hash = crypto.createHash('md5');
    hash.update(params);
    if (Timestamp) hash.update(Timestamp);
    hash.update(this.key);
    let sign = hash.digest('hex');
    sign = Buffer.from(sign).toString('base64');
    sign = encodeURIComponent(sign);
    return sign;
  }
  // 请求
  private async request(data: string, sign: string, type: string, url: string): Promise<object> {
    const result = await superagent
      .post(url)
      .type('form')
      .send({
        RequestData: data,
        DataSign: sign,
        RequestType: type,
        EBusinessID: this.EBusinessID,
        DataType: this.DataType,
      })
      .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return JSON.parse(result.text);
  }
}

export = Kdniao;
