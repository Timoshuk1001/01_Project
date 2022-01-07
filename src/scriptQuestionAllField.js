let questionJsonArr = null;

const questionField = document.querySelector('.pop_up_question'); //поле ввода текста
const choiceOfTheme = document.querySelector('.listSelector'); // выпадашка выбора тем
const answer = document.querySelectorAll('input[type=radio]'); // кнопки тру фолз
const date = document.querySelector('date');
const fileSystem = document.querySelectorAll('input[type=checkbox]'); // выбор файловой системы

const btnCancel = document.querySelector('.btn--cancel');
const btnCreate = document.querySelector('.btn--create'); // кнопка создания темы

const getForm = document.getElementById("edit-form"); // получаем элементы попап формы


function loadData() {
    fetch('/questionJson')
        .then((data) => {
            return data.json()
        })
        .then((data) => {
            questionJsonArr = data;
            console.log(data)
            renderCards(data);
        })
        .catch((e) => {
            console.log(e);
        })
}

loadData();


function renderCards(data) {
    const cards = data.map((dev) => {
         return `<div class="questions">

                    <span class="text">${dev.question}</div>
                    <span class="theme">${dev.theme}</span>
                    <span class="answer">${dev.answer}</span>
                    <span class="date">${dev.date}</span>
                    <button onclick="deleteQuestion(${dev.id})"></button>
                    <br>
               </div>`
     }).join('');
    list.innerHTML = cards;
}

function deleteQuestion(id) {
    const dev = questionJsonArr[id];

    questionField.value = dev.question;
    choiceOfTheme.value = dev.theme;
    answer.value = dev.answer;
    date.value = dev.date;

    btnCreate.value = dev.id;

    form.style.display = 'block';
}

btnCreate.addEventListener('click', (e) => {
    e.preventDefault();
    let findInput =[...answer].find((input)=> input.checked)

    const updatedData = {
        id: +questionJsonArr.length,
        question:  questionField.value,
        theme: choiceOfTheme.value,
        answer: findInput.value,
        date: new Date()

    }

    fetch('/questionJson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData),
    }).then(() => {
        loadData();
        questionField.value = '';
        choiceOfTheme.value = '';
        answer.value = '';
        btnCreate.value = '';

        // form.style.display = 'none';
    });

})






























































// function loadData() {
//     fetch('/questionJson')
//         .then((data) => {
//             return data.json()
//         })
//         .then((data) => {
//             developersArr = data;
//
//             renderCards(data);
//         })
//         .catch((e) => {
//             console.log(e);
//         })
// }
//
// loadData();
//
// editData();
//
//
// function editData(id) {
//
//     questionField.value = ''
//     choiceOfTheme.value = ''
//     answer.value = ''
//     date.getDate();
//     form.style.display = 'block';
// }
//
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//
//     const updatedData = {
//         id: +idInput.value,
//         Text: questionField.value,
//         Theme: choiceOfTheme.value,
//         Answer: answer.value,
//         date: date.getDate()
//     }
//
//     fetch('/questionJson', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updatedData),
//     }).then(() => {
//         loadData();
//         questionField.value = '';
//         choiceOfTheme.value = '';
//         answer.value = '';
//         date.getDate();
//
//         form.style.display = 'none';
//     });
//
// })