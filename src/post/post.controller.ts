import { Request, Response, NextFunction, request } from 'express';
import { getPosts, createPost, updatePost, deletePost } from './post.services';
import _ from 'lodash';
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
/*
创建内容
 */
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //准备数据
  const { title, content } = request.body;
  //创建内容
  try {
    const data = await createPost({ title, content });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 更新内容
 * @param request
 * @param response
 * @param next
 */
export const update = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取内容ID
  const { PostId } = request.params;
  //准备数据
  //const { title, content } = request.body;
  const post = _.pick(request.body, ['title', 'content']);
  //更新
  try {
    const data = await updatePost(parseInt(PostId, 10), post);
    response.send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 删除内容
 */

export const destroy = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { PostId } = request.params; //获取数据,从参数列表里面
  try {
    const data = await deletePost(parseInt(PostId, 10));
    response.send(data); //bug 没有返回响应数据,导致终端卡死未响应
  } catch (error) {
    next(error);
  }
};
