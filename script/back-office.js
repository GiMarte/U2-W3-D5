const url = "https://striveschool-api.herokuapp.com/api/product";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlNmY0YmQ0NzAwMTU4NWIxZDAiLCJpYXQiOjE3NjI1MDMwMDYsImV4cCI6MTc2MzcxMjYwNn0._urbjVpONmkAg8CYAV64r1bWQe5spsCY_e5f1YpI1ik";

const request = async (endpoint = "", options = {}) => {
  const response = await fetch(`${url}${endpoint}`, {
    ...options,
    headers: {
      Authorization: token,
      ...options.headers,
    },
  });
  if (!response.ok) throw new Error(response.status);
  return response.status !== 204 ? response.json() : null;
};

const params = new URLSearchParams(window.location.search).get("id");
const form = document.getElementById("back-form");
const fieldMap = {
  name: "name",
  description: "description",
  brand: "brand",
  imageUrl: "img-url",
  price: "price",
};
const inputs = Object.fromEntries(
  Object.entries(fieldMap).map(([key, id]) => [key, document.getElementById(id)])
);

const fillForm = ({ name, description, brand, imageUrl, price }) => {
  inputs.name.value = name;
  inputs.description.value = description;
  inputs.brand.value = brand;
  inputs.imageUrl.value = imageUrl;
  inputs.price.value = price;
};

const collectFormValues = () =>
  Object.fromEntries(
    Object.entries(inputs).map(([key, input]) => [key, input.value.trim()])
  );

const loadProduct = async () => {
  if (!params) return;
  try {
    const product = await request(`/${params}`);
    fillForm(product);
  } catch (error) {
    console.log("siamo nel catch", error);
  }
};

loadProduct();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const product = collectFormValues();
  if (Object.values(product).some((value) => !value)) return;

  try {
    await request(params ? `/${params}` : "", {
      method: params ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (params) {
      window.location.href = "./home.html";
    } else {
      form.reset();
    }
  } catch (error) {
    console.log("non sono riuscito a salvare:", error);
  }
});

const resetForm = () => form.reset();

const deleteItem = async () => {
  if (!params) return;
  try {
    await request(`/${params}`, { method: "DELETE" });
    setTimeout(() => {
      window.location.href = "./home.html";
    }, 1000);
  } catch (error) {
    console.log("errore nel cancellare l'item", error);
  }
};

const confirmModal = new bootstrap.Modal(
  document.getElementById("confirmModal")
);
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

function openDeleteModal() {
  confirmModal.show();
}

confirmDeleteBtn.addEventListener("click", () => {
  confirmModal.hide();
  deleteItem();
});
