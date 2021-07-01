import { Request, Response, NextFunction } from 'express';
import { getPosts } from './post.services';

// 内容列表

export const index = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    // if (request.headers.authorization != 'SECRET') {
    //   return next(new Error());
    // }
    const posts = await getPosts();
    response.send(posts);
  } catch (error) {
    next(error);
  }
};
