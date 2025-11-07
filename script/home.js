const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlNmY0YmQ0NzAwMTU4NWIxZDAiLCJpYXQiOjE3NjI1MDMwMDYsImV4cCI6MTc2MzcxMjYwNn0._urbjVpONmkAg8CYAV64r1bWQe5spsCY_e5f1YpI1ik";

const getData = function () {
  fetch(url, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then((arr) => {
      console.log(arr);
      arr.forEach((pr) => {
        const container = document.getElementById("row-container");
        const card = document.createElement("div");
        card.setAttribute(
          "class",
          "col col-12 col-md-6 col-xl-3 text-center g-3"
        );
        card.innerHTML = `
                  <div class="card h-100">
                         <img src="${pr.imageUrl}" class="card-img-top h-50" alt="tech-img">
                        <div class="card-body d-flex flex-column">
                            <a href="./details.html?id=${pr._id}" class="flex-grow-1 text-decoration-none">
                            <h5 class="card-title">${pr.brand} ${pr.name}</h5>
                            <p class="card-text ">${pr.description}</p>
                            <p class="card-text">${pr.price}$</p>
                            </a>
                            <div>
                                <a href="./back-office.html?id=${pr._id}" class="btn btn-warning">Edit</a>
                                <button class="btn btn-primary">Buy</button>
                            </div>  
                        </div>
                    </div>
         `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.log("siamo nell catch", err);
    });
};

getData();
