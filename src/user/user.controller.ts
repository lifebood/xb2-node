import { Request, Response, NextFunction } from 'express';
import { UserModel } from './user.model';
import * as userService from './user.userservice';

/**
 *创建用户
 */
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { name, password } = request.body;

  try {
    const data = await userService.createUser({ name, password });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 查找用户
 */

// export const findUser = async (
//   request: Request,
//   response: Response,
//   next: NextFunction,
// ) => {
//   const { username } = request.params;

//   try {
//     const data = await userService.getUserByName(username);
//     if (data == undefined) {

//     }
//   } catch (error) {
//     next(error);
//   }
// };