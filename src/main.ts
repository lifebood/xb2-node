import app from './app';
import { APP_PORT } from './app/app.config';

//console.log(APP_PORT);
app.listen(APP_PORT, () => {
  console.log('服务已启动~~~');
});

//https://ninghao.net/video/8289
