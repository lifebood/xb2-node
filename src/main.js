const http = require('http');

const server = http.createServer((request, response) => {
  //   console.log(request.headers['user-agent']);
  //   response.writeHead(200, {
  //     'Content-Type': 'text/html',
  //   switch (request.url) {
  //     case '/':
  //       response.write('hello~');
  //       break;
  //     case '/posts':
  //       response.write('posts~');
  //       break;
  //     case '/signup':
  //       response.write('signup~');
  //       break;

  //     default:
  //       response.writeHead(404);
  //       response.write('404');
  //       break;
  //   }

  const data = {
    id: 1,
    title: '关山月',
    content: '明月出天山,苍茫云海间',
  };
  const jsondata = JSON.stringify(data);
  response.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8',
  });
  response.write(jsondata);
  response.end();
});
//   response.write(`<input />`);

//   response.end(); curl curlip.me

server.listen(3000, () => {
  console.log('服务已启动');
});
//https://ninghao.net/course/8184 6282234
