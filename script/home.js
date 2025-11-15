const url = "https://striveschool-api.herokuapp.com/api/product";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlNmY0YmQ0NzAwMTU4NWIxZDAiLCJpYXQiOjE3NjI1MDMwMDYsImV4cCI6MTc2MzcxMjYwNn0._urbjVpONmkAg8CYAV64r1bWQe5spsCY_e5f1YpI1ik";

const request = async () => {
  const res = await fetch(url, {
    headers: { Authorization: token },
  });
  if (!res.ok) throw new Error(res.status);
  return res.json();
};

const createCard = ({ _id, brand, name, description, price, imageUrl }) => `
  <div class="col col-12 col-md-6 col-xl-3 text-center g-3">
    <div class="card h-100 bg-card">
      <img src="${imageUrl}" class="card-img-top h-50" alt="tech-img">
      <div class="card-body d-flex flex-column">
        <a href="./details.html?id=${_id}" class="flex-grow-1 text-decoration-none">
          <h5 class="card-title">${brand} ${name}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text">${price}$</p>
        </a>
        <div>
          <a href="./back-office.html?id=${_id}" class="btn btn-warning">Edit</a>
          <button class="btn btn-primary">Buy</button>
        </div>
      </div>
    </div>
  </div>`;

const renderProducts = async () => {
  try {
    const products = await request();
    document.getElementById("row-container").innerHTML = products
      .map(createCard)
      .join("");
  } catch (error) {
    console.log("siamo nel catch", error);
  }
};

renderProducts();
