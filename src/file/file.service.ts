import path from 'path';
import Jimp from 'jimp';
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
/**
 * 调整图像尺寸
 */
export const imageResize = async (image: Jimp, file: Express.Multer.File) => {
  //图像尺寸
  const { imageSize } = image['_exif'];
  //文件路径
  const filePath = path.join(file.destination, 'resized', file.filename);

  //大尺寸

  if (imageSize.width > 1280) {
    image
      .resize(1280, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-large`);
  }

  //中等尺寸
  if (imageSize.width > 640) {
    image
      .resize(640, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-medium`);
  }
  //小尺寸
  if (imageSize.width > 320) {
    image
      .resize(320, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-thumbnail`);
  }
};
