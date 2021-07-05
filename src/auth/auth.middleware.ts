import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as userService from '../user/user.userservice';
import bcrypt from 'bcrypt';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';
import { possess } from './auth.service';
/**
 * 验证用户登录
 */
export const validateLoginData = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('验证用户登录数据~~~');

  const { name, password } = request.body;

  if (!name) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  //验证用户名

  const user = await userService.getUserByName(name, { password: true });

  if (!user) return next(new Error('USER_DOES_NOT_EXIST'));

  //验证用户密码
  const mathed = await bcrypt.compare(password, user.password);
  if (!mathed) return next(new Error('PASSWORD_DOES_NOT_MATCH'));

  //在请求的主体添加用户
  request.body.user = user;
  //下一步
  next();
};

/**
 * 验证用户身份
 */
export const authGuard = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('验证用户身份~~~~');
  try {
    //提取Authourization
    const authorization = request.header('Authorization');

    //console.log(request.headers);
    if (!authorization) throw new Error();
    //提取JWT令牌
    const token = authorization.replace('Bearer ', '');
    //console.log(token);
    if (!token) throw new Error();
    //验证令牌

    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });

    //在请求里添加当前用户

    request.user = decoded as TokenPayload;
    //下一步
    next();
  } catch (error) {
    next(new Error('UNAUTHORIZD'));
  }
};

/**
 * 访问控制
 */
interface AccessControlOptions {
  possession?: boolean;
}

export const accessControl = (options: AccessControlOptions) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    console.log('访问控制');

    //j解构选项
    const { possession } = options;
    //当前用户ID

    //当前用户id
    const { id: userId } = request.user;
    //放行管理员
    if (userId == 1) return next();

    //准备资源
    const resourceIdParam = Object.keys(request.params)[0];

    const resourceType = resourceIdParam.replace('Id', '');

    const resourceId = parseInt(request.params[resourceIdParam], 10);
    //检查拥有权
    try {
      const ownResource = await possess({ resourceId, resourceType, userId });
      if (!ownResource) {
        return next(new Error('USER_DOSE_NOT_OWN_RESOURCE'));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
