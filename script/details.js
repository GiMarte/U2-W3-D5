const url = "https://striveschool-api.herokuapp.com/api/product";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlNmY0YmQ0NzAwMTU4NWIxZDAiLCJpYXQiOjE3NjI1MDMwMDYsImV4cCI6MTc2MzcxMjYwNn0._urbjVpONmkAg8CYAV64r1bWQe5spsCY_e5f1YpI1ik";
const params = new URLSearchParams(window.location.search).get("id");

const request = async (endpoint = "") => {
  const response = await fetch(`${url}${endpoint}`, {
    headers: { Authorization: token },
  });
  if (!response.ok) throw new Error(response.status);
  return response.json();
};

const createDetails = ({ brand, name, description, price, imageUrl }) => `
  <div class="d-md-flex justify-content-between">
    <div class="d-flex justify-content-center">
      <img src="${imageUrl}" width="400px" alt="tech" class="rounded-5 flex-grow-1" />
    </div>
    <div class="flex-grow-1 text-center d-flex flex-column justify-content-around">
      <h1>${brand} ${name}</h1>
      <p>${description}</p>
      <p>${price}$</p>
    </div>
  </div>`;

const loadDetails = async () => {
  if (!params) return;
  try {
    const product = await request(`/${params}`);
    document.getElementById("row-container").innerHTML = createDetails(product);
  } catch (error) {
    console.log("siamo nel catch", error);
  }
};

loadDetails();
