
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
//const date = document.querySelector('date');
const fileSystemArr = document.querySelectorAll('input[type=checkbox]'); // выбор файловой системы
const btnCancel = document.querySelector('.btn--cancel');
const btnCreate = document.querySelector('.btn--create'); // кнопка создания темы
const selectFS = document.getElementById('selectorFile');
const selectTheme = document.getElementById('selectorQuestion');
const confirmDel = document.getElementById('confirmDel');
const cancelDel = document.getElementById('cancelDel');
const modal = document.getElementById('modal');

selectFS.addEventListener('change', (el) => {
    const value = el.target.value;
    localStorage.setItem('fileSystem', value);
    loadData(value);
});

selectTheme.addEventListener('change', (e) => {
    localStorage.setItem('selectTheme', e.target.value);
    loadData(selectFS.value);
})

function loadData(fileSystem) {

    fetch(`/question${fileSystem}`)
        .then((data) => data.json())
        .then((data) => {
            questionData[fileSystem] = data;

            if(selectFS.value === fileSystem) {
                renderCards(data, fileSystem);
            }
            if(selectTheme.value !== ignoreTheme) {
                const filteredByThemeData = data.filter(({theme}) => theme === selectTheme.value);
                renderCards(filteredByThemeData, fileSystem);
            }


        })
        .catch((e) => {
            console.error(e);
        })
}

// loadData('JSON')

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


function renderCards(data, fileSystem) {
    console.log(fileSystem)
    const cards = data.map((quest) => {
        return `<div class="questions">

                    <div class="text">${quest.question}</div>
                    <div class="theme">${quest.theme}</div>
                    <div class="answer">${quest.answer}</div>
                    <div class="flex">
                        <div class="date">${quest.date}</div>
                        <button class="btnDel" onclick="openModal(${quest.id}, '${fileSystem}')">DELETE</button>
                    </div>
                    <br>
               </div>`
     }).join('');
    if (cards !== '') {
        list.innerHTML = cards;
    } else {
        list.innerHTML = '<h4 id="ifNoQuestion">There are no questions</h4>'
    }
}
function openModal(id, fileSystem) {
   confirmDel.dataset.id = id;
    confirmDel.dataset.fileSystem = fileSystem;
    modal.classList.add('active');
}

confirmDel.addEventListener('click', () => {
    const delId = +confirmDel.dataset.id;
    const delFS = confirmDel.dataset.fileSystem;
    modal.classList.remove('active');
    deleteQuestion(delId, delFS);
})
cancelDel.addEventListener('click', () => {
    confirmDel.dataset.id = null;
    confirmDel.dataset.fileSystem = null;
    modal.classList.remove('active');
})


function deleteQuestion(id, fileSystem) {
    const indexId = questionData[fileSystem].findIndex((obj) => {
        return id === obj.id;
    })
    questionData[fileSystem].splice(indexId, 1); // начиная с позиции 1, удалить 1 элемент
    console.log(questionData, fileSystem, indexId)

    fetch(`/question${fileSystem}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionData[fileSystem]),
    }).then(() => {
        loadData(fileSystem);

    });
}

btnCreate.addEventListener('click', (e) => {
    e.preventDefault();
    let findInput =[...answer].find((input)=> input.checked)
let addFSArr = []
    let findFS = [...fileSystemArr].find((input) => {
        if (input.checked) {
         let addSystem = input.value;
            addFSArr.push(addSystem)
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
