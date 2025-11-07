const url = "https://striveschool-api.herokuapp.com/api/product/";

const getData = function () {
  fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlNmY0YmQ0NzAwMTU4NWIxZDAiLCJpYXQiOjE3NjI1MDMwMDYsImV4cCI6MTc2MzcxMjYwNn0._urbjVpONmkAg8CYAV64r1bWQe5spsCY_e5f1YpI1ik",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      res.json();
    })
    .then((arr) => {})
    .catch((err) => {
      "siamo nell catch", err;
    });
};

getData();
