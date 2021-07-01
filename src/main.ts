import app from './app/index';
import { APP_PORT } from './app/app.config';
import { connection } from './app/database/mysql';
//console.log(APP_PORT);
app.listen(APP_PORT, () => {
  console.log('服务已启动~~~');
});

connection.connect(error => {
  if (error) {
    console.log('链接数据库服务失败', error.message);
    return;
  }

  console.log('成功链接数据服务~~~~');
});
//https://ninghao.net/video/8289
