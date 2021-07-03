import jwt from 'jsonwebtoken';

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
