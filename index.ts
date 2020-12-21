'use strict';
import crypto from 'crypto';
import superagent from 'superagent';
import {IKdniao, IParams} from './lib/config';

class Kdniao {
  private EBusinessID: string;
  private DataType = '2';
  private key: string;
  constructor(obj: IKdniao) {
    this.EBusinessID = obj.EBusinessID;
    this.key = obj.key;
  }
  public async allApi(obj: IParams) {
    return await this.init(obj.type, obj.params, obj.url);
  }
  protected async init(RequestType: string, params: object, url: string) {
    const RequestData = JSON.stringify(params);
    const DataSign = this.getSign(RequestData);
    return await this.request(RequestData, DataSign, RequestType, url);
  }
  private getSign(params: string): string {
    const hash = crypto.createHash('md5');
    hash.update(params);
    hash.update(this.key);
    let sign = hash.digest('hex');
    sign = Buffer.from(sign).toString('base64');
    sign = encodeURIComponent(sign);
    return sign;
  }
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
