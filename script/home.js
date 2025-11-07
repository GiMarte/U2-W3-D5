const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlNmY0YmQ0NzAwMTU4NWIxZDAiLCJpYXQiOjE3NjI1MDMwMDYsImV4cCI6MTc2MzcxMjYwNn0._urbjVpONmkAg8CYAV64r1bWQe5spsCY_e5f1YpI1ik";

const getData = function () {
  fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlNmY0YmQ0NzAwMTU4NWIxZDAiLCJpYXQiOjE3NjI1MDMwMDYsImV4cCI6MTc2MzcxMjYwNn0._urbjVpONmkAg8CYAV64r1bWQe5spsCY_e5f1YpI1ik",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then((arr) => {
      console.log(arr);
      arr.forEach((vc) => {
        const container = document.getElementById("row-container");
        const card = document.createElement("div");
        card.setAttribute("class", "col col-12 col-md-6 col-xl-3 text-center");
        card.innerHTML = `
                    <div class="card h-100">
                    <img src="${vc.imageUrl}" class="card-img-top" alt="tech-img">
                    <div class="card-body">
                        <h5 class="card-title">${vc.brand} ${vc.name}</h5>
                        <p class="card-text">${vc.description}</p>
                        <p class="card-text">${vc.price}$</p>
                        <a href="./back-office?${vc._id}.html" class="btn btn-warning">Edit</a>
                    </div>
                    </div>
         `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      "siamo nell catch", err;
    });
};

getData();
