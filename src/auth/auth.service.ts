import jwt from 'jsonwebtoken';
import { connection } from '../app/database/mysql';

import { PRIVATE_KEY } from '../app/app.config';

/**
 * 签发信息
 */

interface SignTokenOptions {
  payload?: any;
}

export const singToken = (options: SignTokenOptions) => {
  //准备选项
  const { payload } = options;
  //签发jwt
  const token = jwt.sign(payload, PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: 60,
  });
  //提供jwt
  return token;
};

/**
 * 检查用户是否拥有指定资源
 */
interface PossessOptions {
  resourceId: number;
  resourceType: string;
  userId: number;
}

export const possess = async (options: PossessOptions) => {
  //准备选项
  const { resourceId, resourceType, userId } = options;
  //准备查询
  const sqlstr = `
  select count(${resourceType}.id) as count
  from ${resourceType}
  where ${resourceType}.id = ? and userID = ? 
  `;
  //检查拥有权
  const [data] = await connection.promise().query(sqlstr, [resourceId, userId]);

  //提供检查结果
  return data[0].count ? true : false;
};
