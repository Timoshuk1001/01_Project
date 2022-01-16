
const questionData = {
    'JSON': [],
    'CSV': [],
    'XML': [],
    'YAML': []
}
const ignoreTheme = 'theme 0';

const questionField = document.querySelector('.pop_up_question'); //поле ввода текста
const choiceOfTheme = document.querySelector('.listSelector'); // выпадашка выбора тем
const answer = document.querySelectorAll('input[type=radio]'); // кнопки тру фолз
const date = document.querySelector('date');
const fileSystem = document.querySelectorAll('input[type=checkbox]'); // выбор файловой системы

const btnCancel = document.querySelector('.btn--cancel');
const btnCreate = document.querySelector('.btn--create'); // кнопка создания темы
const selectFS = document.getElementById('selectorFile');
const selectTheme = document.getElementById('selectorQuestion');

selectFS.addEventListener('change', (el) => {
    const value = el.target.value;

    localStorage.setItem('fileSystem', value);
    loadData(value);
});

selectTheme.addEventListener('change', (e) => {
    localStorage.setItem('selectTheme', e.target.value);
    loadData(selectFS.value);
})

function loadData(fileSistem) {

    fetch(`/question${fileSistem}`)
        .then((data) => data.json())
        .then((data) => {
            questionData[fileSistem] = data;

            if(selectTheme.value === ignoreTheme) {
                return renderCards(data, fileSistem);
            }

            const filteredByThemeData = data.filter(({theme}) => theme === selectTheme.value);
            renderCards(filteredByThemeData, fileSistem);
        })
        .catch((e) => {
            console.error(e);
        })
}


/* (если число меньше десяти, перед числом добавляем ноль) */
function zero_first_format(value)
{
    if (value < 10)
    {
        value='0'+value;
    }
    return value;
}

/* функция получения текущей даты и времени */
function date_time()
{
    let current_datetime = new Date();
    let day = zero_first_format(current_datetime.getDate());
    let month = zero_first_format(current_datetime.getMonth()+1);
    let year = current_datetime.getFullYear();
    let hours = zero_first_format(current_datetime.getHours());
    let minutes = zero_first_format(current_datetime.getMinutes());
    let seconds = zero_first_format(current_datetime.getSeconds());

    return day+"."+month+"."+year+" "+hours+":"+minutes+":"+seconds;
}


function renderCards(data, fileSistem) {
    const cards = data.map((quest) => {
         return `<div class="questions">

                    <span class="text">${quest.question}</div>
                    <span class="theme">${quest.theme}</span>
                    <span class="answer">${quest.answer}</span>
                    <span class="date">${quest.date}</span>
                    <button onclick="deleteQuestion(${quest.id}, '${fileSistem}')">DELETE</button>
                     
                    <br>
               </div>`
     }).join('');
    list.innerHTML = cards;
}

function deleteQuestion(id, fileSistem) {
    const indexId = questionData[fileSistem].findIndex((obj) => {
        return id === obj.id;

    })
    questionData[fileSistem].splice(indexId, 1); // начиная с позиции 1, удалить 1 элемент
    //console.log(questionData, fileSistem, indexId)

    fetch(`/question${fileSistem}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionData[fileSistem]),
    }).then(() => {
        loadData(fileSistem);

    });
}

btnCreate.addEventListener('click', (e) => {
    e.preventDefault();
    let findInput =[...answer].find((input)=> input.checked)
let addFSArr = []
    let findFS = [...fileSystem].find((input) => {
        if (input.checked) {
         let addSistem = input.value;
            addFSArr.push(addSistem)
        }

    })
    console.log(addFSArr)
    for (let i of addFSArr) {
        const updatedData = {
        id: +questionData[i].length,
        question:  questionField.value,
        theme: choiceOfTheme.value,
        answer: findInput.value,
        date: date_time()
    }

    questionData[i].push(updatedData);


    fetch(`/question${i}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionData[i]),
    }).then(() => {
        loadData(i);
        questionField.value = '';
        choiceOfTheme.value = '';
        answer.value = '';
        btnCreate.value = '';

    });
}

})

document.addEventListener('DOMContentLoaded', () => {
    try{
        const localStorageFileSystemValue = localStorage.getItem('fileSystem');
        const localStorageThemeValue = localStorage.getItem('selectTheme');

        if(localStorageFileSystemValue) selectFS.value = localStorageFileSystemValue;
        if(localStorageThemeValue) selectTheme.value = localStorageThemeValue;

        const currentFileSystemValue = selectFS.value;

        loadData(currentFileSystemValue);
    } catch(e){
        console.error(e);
    }

})
