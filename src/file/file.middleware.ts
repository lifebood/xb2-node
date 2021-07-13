import { Request, Response, NextFunction, json } from 'express';
import multer from 'multer';
import Jimp from 'jimp';
import { imageResize } from './file.service';

/**
 * 创建一个multer
 */
const fileUpload = multer({
  dest: 'uploads/',
});

/**
 * 文件拦截器
 */
export const fileInterceptor = fileUpload.single('file');

/**
 * 文件处理器
 */
export const fileProcessor = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //文件路径
  const { path } = request.file;

  let image: Jimp;
  try {
    //读取图像文件
    image = await Jimp.read(path);
  } catch (error) {
    return next(error);
  }
  //准备文件数据
  const { imageSize, tags } = image['_exif'];
  request.fileMetaData = {
    width: imageSize.width,
    height: imageSize.height,
    metadata: JSON.stringify(tags),
  };
  //调整图像尺寸
  imageResize(image, request.file);
  next();
};
