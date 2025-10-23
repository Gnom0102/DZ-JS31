// 2. Создай приложение для учета расходов. Сохрани каждую запись расхода(описание, сумма, дата) в LocalStorage в виде массива объектов JSON. Затем извлеки данные из LocalStorage и отобрази список расходов.Также реализуй функцию удаления записи из LocalStorage;

const expenseForm = document.getElementById("expenseForm");

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const expense = {
    description: document.getElementById("description").value.trim(),
    amount: parseFloat(document.getElementById("amount").value),
    date: document.getElementById("date").value
  };

  let expenses = JSON.parse(localStorage.getItem("expenses")) || []; // Получаем текущие расходы из LocalStorage или создаем пустой массив

  expenses.push(expense); // Добавляем новый расход в массив

  localStorage.setItem("expenses", JSON.stringify(expenses)); // Сохраняем обновленный массив обратно в LocalStorage

  displayExpenses(); // Обновляем отображение списка расходов
});

function displayExpenses() {
  const expenseList = document.getElementById("expenseList");
  const totalExpensesElem = document.getElementById("totalExpenses");

  expenseList.innerHTML = ""; // Очищаем текущий список

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");

    li.textContent = `${expense.date} - ${expense.description}: ${expense.amount.toLocaleString('ru-RU', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })} ₽`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", function () {
      expenses.splice(index, 1); // Удаляем расход из массива
      localStorage.setItem("expenses", JSON.stringify(expenses)); // Обновляем LocalStorage
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
displayExpenses(); // Инициализируем отображение списка расходов при загрузке страницы

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", function () {
  localStorage.removeItem("expenses");
  displayExpenses();
}); // Кнопка для очистки всех расходов

