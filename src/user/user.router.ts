import express from 'express';
import * as userController from './user.controller';
import { validateUserData, hashPassword } from './user.middleware';

const router = express.Router();

/**
 *创建用户
 */
router.post('/users', validateUserData, hashPassword, userController.store);

/**
 * 查找用户
 */

export default router;
