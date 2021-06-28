// function log(){
//     console.log('log::');
// }
// const log = (message,prefix)=>{
//     console.log(prefix,message);
// }

// log('hello~','LOG');
// log('你好','日志');

// const great=(name)=>'你好'+name;
// const greating = great('YY');
// console.log(greating);

// const book={
//     title:'小白兔的开发之路',
//     toString(){
//         return `《${this.title}》`;
//     }
// };
// console.log(book.toString());

// const book={
//     title:'小白兔的开发之路',
//     author:'yy'
// }

// const{title,author}=book;
// const{title:title1,author:author1}=book;
// console.log(`《${title}》${author}`);
// console.log(`《${title1}》${author1}`);

// const fruits=['苹果','香蕉','桔子'];
// const [f1,f2,f3]=fruits;
// console.log(f1,f2,f3);

// const fruits = ['苹果', '香蕉', '桔子'];
// const vegetables = ['土豆', '茄子', '辣椒'];
// const food = [...fruits, ...vegetables];
// console.log(food);

//展开操作符  ...
// const data = {
//   title: '小白的开发之路',
// };
// const author = {
//   name: 'yy',
// };
// const book = {
//   ...data,
//   author,
// };
// console.log(book);

//if
// function aa(speed1) {
//   let speed = speed1;
//   if (speed > 120) {
//     console.log('您已超速');
//   } else {
//     console.log('您没有超速');
//   }
// }
// aa(120);

//switch
// let gear = 'D';
// switch (gear) {
//   case 'P':
//     console.log('停车');
//     break;
//   case 'R':
//     console.log('倒档');
//     break;
//   case 'D':
//     console.log('开车');
//     break;
//   case 'N':
//     console.log('空挡');
//     break;
// }
//throw
// const drive = () => {
//   throw new Error('没油了');
// };
// drive();
const getGasonLine = () => {
  return false;
};
const drive = () => {
  const gasonline = getGasonLine();
  if (!gasonline) {
    throw new Error('没油了');
  }
  console.log('呜~呜~~~~');
};
try {
  drive();
} catch (error) {
  console.log(error.message);
}
