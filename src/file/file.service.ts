import { connection } from '../app/database/mysql';
import { FileModel } from './file.model';

/**
 * 存储文件信息
 */
export const createFile = async (file: FileModel) => {
  //准备查询

  const sqlstr = `
insert into file
set ?
`;
  //执行查询
  const [data] = await connection.promise().query(sqlstr, file);
  //提供数据
  return data;
};

/**
 * 按ID 查找文件
 */
export const findFileById = async (fileId: number) => {
  const sqlstr = `
    select * from file where id = ?
    `;

  const [data] = await connection.promise().query(sqlstr, fileId);

  return data[0];
};
