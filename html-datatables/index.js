new DataTable("#example");

// const host = "http://localhost:3000";
const host = "https://dev-woc-backend.exporum.com";
// const host = 'https://woc-backend.exporum.com';

const test = async () => {
  console.log("### onClickPay");

  axios
    .get(`${host}/api/v1/press-center?page=1&order=desc`)
    .then(function (response) {
      const pressCenterDatas = response.data.data;
      // console.log(pressCenterDatas);
      const tBody = document.querySelector('#press-center > tbody');

      pressCenterDatas.forEach(data => {
        const tr = document.createElement('tr');
        ['id', 'title', 'writer', 'updatedAt'].forEach((key) => {
          const td = document.createElement('td');
          td.innerHTML = data[key];
          tr.append(td);
        })
        tBody.append(tr);
      });

      new DataTable("#press-center");
    })
    .catch(function (error) {
      console.log(error);
    });
};
document.querySelector("button").addEventListener("click", test);
