import { Request, Response, NextFunction, request } from 'express';
import { singToken } from './auth.service';
/**
 * 用户登录
 */

export const login = async (
  reqeust: Request,
  response: Response,
  next: NextFunction,
) => {
  const {
    user: { id, name },
  } = reqeust.body;
  const payload = { id, name };
  try {
    //签发令牌
    const token = singToken({ payload });

    //做出响应
    response.send({ id, name, token });
  } catch (error) {
    next(error);
  }
};

/**
 * 验证登录
 */
export const validate = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.user);
  response.sendStatus(200);
};
