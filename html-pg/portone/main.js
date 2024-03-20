const host = "http://localhost:3000";
// const host = 'https://dev-woc-backend.exporum.com';
// const host = 'https://woc-backend.exporum.com';

IMP.init("imp68834074");

// const button = document.querySelector('button');
const button = document.querySelector("#paynow");

const onClickPay = async () => {
  console.log("### onClickPay");

  axios
    .post(`${host}/api/v1/order/order-number`, {
      order: {
        productId: 1,
        email: "seonghuncho@exporum.com",
      },
      attendee: {
        prefix: "Mr",
        firstName: "Seonghun",
        lastName: "Cho",
        jobTitle: "manager",
        company: "SHC",
        phone: "02-1234-5678",
        cellPhone: "010-3906-9140",
        email: "seonghuncho@exporum.com",
        city: "seoul",
        country: "KR",
        callingNumberCode: "KR",
        isPolicyChecked: true,
        isPrivacyChecked: true,
        venue: 1,
      },
      demographic: {
        occupation: "Barista",
        industry: "Consultant",
        firstTimeAttending: "true",
        experience: "1-5 years",
        authority: "Influencer",
        objective: "Product Discovery",
        ageGroup: "14-19",
        interest: "Allied Beverages",
      },
    })
    .then(function (response) {
      requestSDK(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

button.addEventListener("click", onClickPay);

function requestSDK(entity) {
  console.log("### requestSDK");
  console.log(entity);

  IMP.request_pay(
    {
      pg: "eximbay.1849705C64",
      pay_method: "card",
      merchant_uid: entity.merchantId, // 주문번호
      name: entity.productName,
      amount: entity.amount, // 숫자 타입
      buyer_email: entity.email,
      buyer_name: "seonghun cho",
      buyer_tel: "010-3906-9140",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01181",
      notice_url: `${host}/api/v1/payment/webhook`,
      language: "en",
    },
    function (rsp) {
      // callback
      //rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단합니다.

      console.log("callback:: ");
      console.log(rsp);

      if (rsp.success === false) {
        axios
          .post(`${host}/api/v1/order/cancel`, {
            merchantId: entity.merchantId,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  );
}

function saveAttendee(option) {
  axios
    .post(`${host}/api/v1/attendee`, {
      attendee: {
        prefix: "Mr",
        firstName: "Seonghun",
        lastName: "Cho",
        jobTitle: "manager",
        company: "SHC",
        phone: "02-1234-5678",
        cellPhone: "010-1234-5678",
        email: "seonghuncho@exporum.com",
        city: "test city",
        country: "KR",
        isPolicyChecked: true,
        isPrivacyChecked: true,
        venue: 1,
      },
      demographic: {
        occupation: "Barista",
        industry: "Consultant",
        firstTimeAttending: "true",
        experience: "1-5 years",
        authority: "Influencer",
        objective: "Product Discovery",
        ageGroup: "14-19",
        interest: "Allied Beverages",
      },
      option: option,
    })
    .then(function (response) {
      requestSDK(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const login = async () => {
  axios
    .post(
      `${host}/api/v1/admin/signin`,
      {
        email: "seonghuncho@exporum.com",
        password: "exporum1!",
      },
      {
        withCredentials: true,
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getBadgeExcel = async () => {
  axios
    .get(`https://woc-backend.exporum.com/api/v1/admin/badge/excel`, {
      // credential: 'include',
      // Headers: {
      //   Cookie: 'Authorization=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzZW9uZ2h1bmNob0BleHBvcnVtLmNvbSIsIm5hbWUiOiLsobDshLHtm4giLCJsYXN0TG9naW5lZEF0IjoiMjAyNC0wMy0xNVQwMDo1ODo0NS4xODNaIiwiaWF0IjoxNzEwNDY0MzI1LCJleHAiOjE3MTA3MjM1MjV9.FFTOP85fbce-AH49iWm7Rwhynfhig2x0UTheAgL_exU'
      // },
      withCredentials: true,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

document.querySelector("#login").addEventListener("click", login);
document.querySelector("#getBadge").addEventListener("click", getBadgeExcel);
