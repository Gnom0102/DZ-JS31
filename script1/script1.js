// 1. Создай форму для ввода контактной информации(имя, телефон, email).Сохрани данные в LocalStorage в виде объекта JSON.Затем извлеки данные из LocalStorage, преобразуй их обратно в объект и отобрази контактную информацию на странице;

const form = document.getElementById("myForm");
const output = document.getElementById("output");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const clearBtn = document.getElementById("clearBtn");

function createOutput(data) {
  output.innerHTML = `
    <h3>Информация о пользователе:</h3>
    <p><strong>Имя:</strong> ${data.name}</p>
    <p><strong>Телефон:</strong> ${data.phone}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Описание:</strong> ${data.description}</p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const userData = JSON.parse(storedData);
    createOutput(userData);

    nameInput.value = userData.name || "";
    phoneInput.value = userData.phone || "";
    emailInput.value = userData.email || "";
    messageInput.value = userData.description || "";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault(); // предотвращаем перезагрузку страницы при отправке формы

  const userData = {
    name: nameInput.value.trim(), //trim() - удаляет пробелы в начале и конце строки
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
    description: messageInput.value.trim()
  }; // создаем объект с данными пользователя

  localStorage.setItem("userData", JSON.stringify(userData)); // сохраняем объект в LocalStorage в виде строки JSON

  createOutput(userData);
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("userData");
  output.innerHTML = "";
  form.reset();
  alert("Данные очищены!");
});