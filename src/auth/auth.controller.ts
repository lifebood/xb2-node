import { Request, Response, NextFunction, request } from 'express';
/**
 * 用户登录
 */

export const login = async (
  reqeust: Request,
  response: Response,
  next: NextFunction,
) => {
  const { name, password } = reqeust.body;

  response.send({ messsage: `欢迎回来:${name}` });
};
