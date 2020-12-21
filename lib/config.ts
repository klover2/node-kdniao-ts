'use strict';
export interface IKdniao {
  EBusinessID: string;
  key: string;
  env?: boolean;
}
export interface IParams {
  type: string;
  params: object;
}

export interface IAllApi extends IParams {
  url: string;
}
