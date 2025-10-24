// 2. Создай приложение для учета расходов. Сохрани каждую запись расхода(описание, сумма, дата) в LocalStorage в виде массива объектов JSON. Затем извлеки данные из LocalStorage и отобрази список расходов.Также реализуй функцию удаления записи из LocalStorage;

const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalExpensesElem = document.getElementById("totalExpenses");
const clearBtn = document.getElementById("clearBtn");

function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function displayExpenses() {
  const expenses = getExpenses();
  expenseList.innerHTML = ""; // Очищаем текущий список

  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
    <span>${expense.date} - ${expense.description}:
     <strong>${expense.amount.toLocaleString('ru-RU', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })} ₽</strong></span>
     `;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", function () {
      expenses.splice(index, 1); // Удаляем расход из массива
      saveExpenses(expenses); // Обновляем LocalStorage
      displayExpenses(); // Обновляем отображение списка расходов
    });

    li.appendChild(deleteButton);
    expenseList.appendChild(li);

    total += expense.amount;
  });

  totalExpensesElem.textContent = `Итого: ${total.toLocaleString('ru-RU', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })} ₽`;
}

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = document.getElementById("description").value.trim();
  const amountValue = document.getElementById("amount").value.trim();
  const date = document.getElementById("date").value;

  const amount = parseFloat(amountValue);

  if (!description) {
    alert("Введите описание расхода!");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Введите корректную сумму (больше 0)!");
    return;
  }

  if (!date) {
    alert("Выберите дату!");
    return;
  }

  const expense = getExpenses();
  expense.push({ description, amount, date });
  saveExpenses(expense);

  displayExpenses();

  expenseForm.reset();
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("expenses");
  displayExpenses();
}); // Кнопка для очистки всех расходов

document.addEventListener("DOMContentLoaded", displayExpenses);