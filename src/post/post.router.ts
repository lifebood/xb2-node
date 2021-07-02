import express from 'express';

import * as postController from './post.controller';

import { requsetUrl } from '../app/app.middleware';

const router = express.Router();
/**
 * 内容列表
 */
router.get('/posts', requsetUrl, postController.index);

/**
 * 创建内容
 */
router.post('/posts', postController.store);

/**
 * 更新内容
 */

router.patch('/posts/:PostId', postController.update);
/**
 * 删除内容
 */
router.delete('/posts/:PostId', postController.destroy);

/**
 * 导出路由
 */
export default router;
