document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
});

// const serializers = {
//     string: s => `${s}`,
//     number: n => n.toString(),
//     boolean: b => b.toString(),
//     function: f => f.toString(),
//     object: o => {
//         if (Array.isArray(o)) return '[' + o + ']';
//         if (o === null) return 'null';
//         let s = '{';
//         for (const key in o) {
//             const value = o[key];
//             if (s.length > 1) s = s + ',';
//             s = s + key + ':' + serialize(value);
//         }
//         return s + '}';
//     }
// };
//
// const serialize = obj => {
//     const type = typeof obj;
//     const serializer = serializers [type];
//     return serializer(obj);
// };

// эта функция сработает при нажатии на кнопку
// function sendJSON() {
//
//     // с помощью jQuery обращаемся к элементам на странице по их именам
//     // а вот сюда мы поместим ответ от сервера
//     let result = document.querySelector('.result');
//     // создаём новый экземпляр запроса XHR
//     let xhr = new XMLHttpRequest();
//     // адрес, куда мы отправим нашу JSON-строку
//
//     // открываем соединение
//     xhr.open("POST", './questionJson', true);
//     // устанавливаем заголовок — выбираем тип контента, который отправится на сервер, в нашем случае мы явно пишем, что это JSON
//     xhr.setRequestHeader("Content-Type", "application/json");
//     // когда придёт ответ на наше обращение к серверу, мы его обработаем здесь
//     xhr.onreadystatechange = function () {
//         // если запрос принят и сервер ответил, что всё в порядке
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             // выводим то, что ответил нам сервер — так мы убедимся, что данные он получил правильно
//             result.innerHTML = this.responseText;
//         }
//     };
//     // преобразуем наши данные JSON в строку
//     var data = JSON.stringify({ "Текст вопроса:": questionField.value, "Тема вопроса": choiceOfTheme.value, "Ответ": answer.value, date });
//     // когда всё готово, отправляем JSON на сервер
//     xhr.send(data);
// }









// function upload(event) {
//     console.log('upload start');
//     let target = event.target || event.srcElement || event.currentTarget; //большая кросс браузерность
//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', './questionJson.json', true); // посылаем пост запрос на сервер
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.onreadystatechange = function () {
//         event = null;
//         if (xhr.readyState === 4) {
//             if (xhr.status === 200) {
//                 callBackFunction(this.responseText);
//             } else {
//                 console.log('error')
//             }
//         }
//     }
//     xhr.send('string');
//     event.target.value = '';
// }
//
// function callBackFunction(data) {
//     console.log(data);
//     questionField.value = '';
//     answer.value = '';
//     choiceOfTheme.value = '';
// }
// btnCreate.addEventListener('change', upload);


// асинхронная функция для чтения json
// function loadData() {
//     fetch('./questionJson')
//         .then((data) => {
//             return data.json()
//         })
//         .then((data) => {
//             developersArr = data;
//         })
//         .catch((e) => {
//             console.log(e);
//         })
// }
//
// loadData();
//
//
// getForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//
//     const update = {
//         id: +btnCreate.value,
//         questionText: questionField.value,
//         Answer: answer.value,
//         questionTheme: choiceOfTheme.value
//     }
//
//
//     fetch('/questionJson', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(update),
//     }).then(() => {
//         loadData();
//         questionField.value = '';
//         answer.value = '';
//         choiceOfTheme.value = '';
//         btnCreate.value = '';
//
//     });
//
// })



// var xhr = new XMLHttpRequest();
// var url = "./questionJson";
// xhr.open("POST", url, true);
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         var json = JSON.parse(xhr.responseText);
//         console.log(json.text + ", " + json.theme + ", " + json.answer + ", " + date);
//     }
// };
//
//
//
// JSON.stringify({questionField, choiceOfTheme, answer, date}); // записывает в обновленный массив
// // Sending a receiving data in JSON format using GET method
// //
// var xhr = new XMLHttpRequest();
// var url = "url?data=" + encodeURIComponent(JSON.stringify({
//     "text": questionField.value = '',
//     "theme": choiceOfTheme.value = '',
//     "answer": answer.value = '',
//     date
// }));
// xhr.open("GET", url, true);
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         var json = JSON.parse(xhr.responseText);
//         console.log(json.text + ", " + json.theme + ", " + json.answer + ", " + date);
//     }
// };




