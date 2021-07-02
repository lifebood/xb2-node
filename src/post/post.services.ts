import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';

//获取内容列表

export const getPosts = async () => {
  const statement = `
    select post.id,post.title,post.content,
    JSON_OBJECT(
        'id',user.id,
        'name',user.name
    ) as user from post
    left join user
    on user.id=post.userId
  `;
  const [data] = await connection.promise().query(statement);
  return data;
};

export const createPost = async (post: PostModel) => {
  //准备查询
  const statement = `
  insert into post
  set ?
  `;
  //执行查询
  const [data] = await connection.promise().query(statement, post);
  return data;
};

export const updatePost = async (PostId: number, post: PostModel) => {
  //准备查询
  const statement = `
  update post set ?
  where id = ?
  `;
  //执行查询
  const [data] = await connection.promise().query(statement, [post, PostId]);
  //返回数据
  return data;
};

/**
 * 删除数据
 * @param PostId
 * @returns
 */
export const deletePost = async (PostId: number) => {
  const statement = `
    delete from post 
    where id=?
  `;

  const [data] = await connection.promise().query(statement, PostId);

  return data;
};
