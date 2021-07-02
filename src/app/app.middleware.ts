import { Request, Response, NextFunction } from 'express';

/**
 * 输出请求地址
 */

export const requsetUrl = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.url);
  next();
};

/**
 * 默认异常处理器
 */
export const defalutErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error.message) {
    console.log('错误:', error.message);
  }
  let statusCode: number, message: string;
  switch (error.message) {
    case 'NAME_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户名';
      break;
    case 'PASSWORD_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户密码';
      break;
    case 'USER_ALREDAY_EXIST':
      statusCode = 409;
      message = '用户名已经被占用了';
      break;
    case 'USER_DOES_NOT_EXIST':
      statusCode = 400;
      message = '用户不存在';
      break;
    case 'PASSWORD_DOES_NOT_MATCH':
      statusCode = 400;
      message = '密码不正确!';
      break;
    default:
      statusCode = 500;
      message = '服务暂时出了点问题~~~';
      break;
  }

  response.status(statusCode).send({ message });
};
