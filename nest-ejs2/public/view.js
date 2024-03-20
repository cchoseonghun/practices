// function hello(str) {
//   console.log(str);
// }

function hello(data) {
  data.forEach((item) => {
    console.log('Name:', item.name);
    console.log('Age:', item.age);
  });
}
