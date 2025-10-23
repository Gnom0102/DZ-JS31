// 1. Создай форму для ввода контактной информации(имя, телефон, email).Сохрани данные в LocalStorage в виде объекта JSON.Затем извлеки данные из LocalStorage, преобразуй их обратно в объект и отобрази контактную информацию на странице;

const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // предотвращаем перезагрузку страницы при отправке формы

  const userData = {
    name: document.getElementById("name").value.trim(), //trim() - удаляет пробелы в начале и конце строки
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    description: document.getElementById("message").value.trim()
  }; // создаем объект с данными пользователя

  localStorage.setItem("userData", JSON.stringify(userData)); // сохраняем объект в LocalStorage в виде строки JSON

  const storedData = JSON.parse(localStorage.getItem("userData")); // извлекаем данные из LocalStorage и преобразуем обратно в объект

  alert(`Контактная информация:
  Имя: ${storedData.name}
  Телефон: ${storedData.phone}
  Email: ${storedData.email}
  Описание: ${storedData.description}`);
}); // отображаем контактную информацию в alert 