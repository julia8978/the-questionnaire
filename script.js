const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
  // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
  // https://learn.javascript.ru/default-browser-action
  event.preventDefault();
  const formData = new FormData(form);
    fetch(`https://polinashneider.space/user`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer: julia8978'
    },
    body: JSON.stringify({
      "name": formData.get('name'),
      "secondName": formData.get('secondName'),
      "phone": formData.get('phone'),
      "email": formData.get('email'),
      "agree": document.getElementById("agree").checked
    }),
})
.then(response => {
  if (!response.ok) {
    return response.json().then(errorData => {
      throw new Error(errorData.message);
    });
  }
  return response.json();
})
.then(data => {
  Toastify({
    text: data.message || "Данные успешно отправлены!",
    duration: 3000,
    gravity: "top",
    position: 'center',
    backgroundColor: "linear-gradient(to right, #99ff99, #ff99cc)",
  }).showToast();
  form.reset();
})
.catch(error => {
  Toastify({
    text: "Ошибка: " + error.message,
    duration: 3000,
    gravity: "top",
    position: 'center',
    backgroundColor: "linear-gradient(to right, #ff99cc, #99ff99)",
  }).showToast();
});
});