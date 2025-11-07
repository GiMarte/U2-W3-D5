const url = "https://striveschool-api.herokuapp.com/api/product";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlNmY0YmQ0NzAwMTU4NWIxZDAiLCJpYXQiOjE3NjI1MDMwMDYsImV4cCI6MTc2MzcxMjYwNn0._urbjVpONmkAg8CYAV64r1bWQe5spsCY_e5f1YpI1ik";
const params = new URLSearchParams(window.location.search).get("id");

if (params) {
  fetch(`${url}/${params}`, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then((pr) => {
      console.log(pr);
      const container = document.getElementById("row-container");
      const card = document.createElement("div");
      card.setAttribute("class", "d-md-flex justify-content-between");
      card.innerHTML = `
                          <div class="d-flex justify-content-center">
              <img src="${pr.imageUrl}" width="400px" alt="tech" class="rounded-5 flex-grow-1" />
            </div>
            <div
              class="flex-grow-1 text-center d-flex flex-column justify-content-around">
                <h1>${pr.brand} ${pr.name}</h1>
              <p>
               ${pr.description} 
              </p>
              <p>
                 ${pr.price}$
              </p> 
            </div>
         `;
      container.appendChild(card);
    })
    .catch((err) => {
      console.log("siamo nell catch", err);
    });
}
