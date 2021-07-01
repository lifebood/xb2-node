import express from 'express';

import * as postController from './post.controller';

import { requsetUrl } from '../app/app.middleware';

const router = express.Router();

router.get('/posts', requsetUrl, postController.index);

export default router;
