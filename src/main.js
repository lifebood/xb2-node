const http = require('http');

const server = http.createServer((request, response) => {
  //   console.log(request.headers['user-agent']);
  //   response.writeHead(200, {
  //     'Content-Type': 'text/html',
  switch (request.url) {
    case '/':
      response.write('hello~');
      break;
    case '/posts':
      response.write('posts~');
      break;
    case '/signup':
      response.write('signup~');
      break;

    default:
      response.writeHead(404);
      response.write('404');
      break;
  }
  response.end();
});
//   response.write(`<input />`);

//   response.end();

server.listen(3000, () => {
  console.log('服务已启动');
});
