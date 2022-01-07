let questionJsonArr = null;

const questionField = document.querySelector('.pop_up_question'); //поле ввода текста
const choiceOfTheme = document.querySelector('.listSelector'); // выпадашка выбора тем
const answer = document.querySelectorAll('input[type=radio]'); // кнопки тру фолз
const date = document.querySelector('date');
const fileSystem = document.querySelectorAll('input[type=checkbox]'); // выбор файловой системы

const btnCancel = document.querySelector('.btn--cancel');
const btnCreate = document.querySelector('.btn--create'); // кнопка создания темы

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
    const cards = data.map((quest) => {
         return `<div class="questions">

                    <span class="text">${quest.question}</div>
                    <span class="theme">${quest.theme}</span>
                    <span class="answer">${quest.answer}</span>
                    <span class="date">${quest.date}</span>
                    <button onclick="deleteQuestion(${quest.id})">DELETE</button>
                     
                    <br>
               </div>`
     }).join('');
    list.innerHTML = cards;
}

function deleteQuestion(id) {
    const indexId =  questionJsonArr.findIndex((obj) => {
        return id === obj.id;
    })
    questionJsonArr.splice(indexId, 1); // начиная с позиции 1, удалить 1 элемент
    fetch('/questionJson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionJsonArr),
    }).then(() => {
        loadData();

    });
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

    questionJsonArr.push(updatedData);


    fetch('/questionJson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionJsonArr),
    }).then(() => {
        loadData();
        questionField.value = '';
        choiceOfTheme.value = '';
        answer.value = '';
        btnCreate.value = '';

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