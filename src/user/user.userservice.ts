import { connection } from '../app/database/mysql';
import { UserModel } from './user.model';

/**
 *创建用户
 */
export const createUser = async (user: UserModel) => {
  //定义SQL语句
  const statement = `
    insert into user 
    set ?
    `;
  //执行sql
  const [data] = await connection.promise().query(statement, user);
  //返回执行数据
  return data;
};

/**
 * 查找用户
 */

export const getUserByName = async (name: string) => {
  const sqlstring = `
    select id,name 
    from user 
    where name = ?
    `;

  const [data] = await connection.promise().query(sqlstring, name);

  return data[0];
};
