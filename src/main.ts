// const { response } = require('express');
//const express = require('express');
import express from 'express';
import {Request,Response} from 'express';
const app = express();
const prot = 3000;
//使用json中间件
app.use(express.json());

app.listen(prot, () => {
  console.log('服务已启动');
});

app.get('/', (request:Request, response:Response) => {
  response.send('你好');
});
const data = [
  {
    id: 1,
    title: '关山月',
    content: '明月出天山,苍茫白云间',
  },
  {
    id: 2,
    title: '望岳',
    content: '会当凌绝顶,一览众山小',
  },
  {
    id: 3,
    title: '忆江南',
    content: '日出红花红胜火,春来江水绿如蓝',
  },
];

app.get('/', (request:Request, response:Response) => {
  response.send(data);
});

app.get('/posts/:postId', (req:Request, res:Response) => {
  //获取内容ID
  const { postId } = req.params;
  //查找具体内容
  const posts = data.filter((item) => item.id == parseInt(postId,10));
  //做出响应
  res.send(posts[0]);
});

//创建内容
app.post('/posts', (req:Request, res:Response) => {
  //获取请求资源
  const { content } = req.body;
  //设置响应代码
  res.status(201);
  //输出请求头部数据
  console.log(req.headers['sing-along']);
  //设置响应头部数据
  res.set('Sing-Along', 'How I wonder what you are!');
  //做出响应
  res.send({
    message: `成功创建了内容:${content}`,
  });
});
//https://ninghao.net/video/8252
