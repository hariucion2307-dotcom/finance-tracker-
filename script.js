/* массив объектов (главное требование) */
let transactions = [];
/* DOM элементы */
const form = document.getElementById("form");
const list = document.getElementById("list");
const balanceEl = document.getElementById("balance");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
/* добавление элемента */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value.trim();
  /* валидация */
  if (!title || !category) {
    alert("Заполните все поля");
    return;
  }
  if (amount <= 0) {
    alert("Сумма должна быть больше 0");
    return;
  }
  /* добавление объекта в массив */
  transactions.push({
    title,
    amount: Number(amount),
    type,
    category
  });
  form.reset();
  render();
});
/* удаление элемента */
function deleteItem(index) {
  transactions.splice(index, 1);
  render();
}
/* отрисовка DOM */
function render() {
  list.innerHTML = "";
  let data = transactions.filter(item => {
    const searchText = search.value.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.category.toLowerCase().includes(searchText);
    const matchFilter =
      filter.value === "all" || item.type === filter.value;
    return matchSearch && matchFilter;
  });
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.title}</td>
      <td>${item.amount}</td>
      <td>${item.type}</td>
      <td>${item.category}</td>
      <td><button onclick="deleteItem(${index})">X</button></td>
    `;
    list.appendChild(row);
  });
  updateBalance();
}
/* подсчет баланса */
function updateBalance() {
  let balance = 0;
  transactions.forEach(item => {
    if (item.type === "income") {
      balance += item.amount;
    } else {
      balance -= item.amount;
    }
  });
  balanceEl.textContent = balance;
}
/* события */
search.addEventListener("input", render);
filter.addEventListener("change", render);
/* старт */ 
render();