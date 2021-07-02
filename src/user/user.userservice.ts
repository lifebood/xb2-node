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
 * 按用户名查找用户
 */
interface getUserOptions {
  password?: boolean;
}
export const getUserByName = async (
  name: string,
  options: getUserOptions = {},
) => {
  const { password } = options;
  const sqlstring = `
    select 
    id,
    name
    ${password ? ',password' : ''}
    from user 
    where name = ?
    `;

  const [data] = await connection.promise().query(sqlstring, name);
  //console.log(data[0]);
  return data[0];
};
