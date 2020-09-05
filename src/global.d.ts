/* eslint-disable @typescript-eslint/no-empty-interface */
import 'express';

import * as core from 'express-serve-static-core';

declare module 'express' {
  export interface ErrorRequestHandler<
    P extends core.Params = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query
  > extends core.ErrorRequestHandler<P, ResBody, ReqBody, ReqQuery> {}
  export interface Request<
    P extends core.Params = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query
  > extends core.Request<P, ResBody, ReqBody, ReqQuery> {}
  export interface RequestHandler<
    P extends core.Params = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query
  > extends core.RequestHandler<any, ResBody, ReqBody, ReqQuery> {}
}
