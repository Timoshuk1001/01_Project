const txtLimit = questionField.getAttribute("maxlength");
const txtCounter = document.querySelector(".texrarea__counter span");
const form = document.querySelector("#edit-form")
txtCounter.innerHTML = txtLimit;

// Очищаем все поля при нажатии на кнопку cancel
btnCancel.addEventListener('click', function (e){

    questionField.value = '';
    choiceOfTheme.value = "theme 0";
    txtSetCounter();
})

// создаем и вызываем функцию счетчика лимита поля ввода
questionField.addEventListener("keyup", txtSetCounter);
questionField.addEventListener("keydown", function (event){
    if(event.repeat) txtSetCounter();  // функция позволяет считывать счетчик даже если есть залипание клавиш
});

function txtSetCounter(){

    const txtCounterResult = txtLimit - questionField.value.length;
    txtCounter.innerHTML = txtCounterResult;
}
btnCreate.addEventListener("click", function (e){
})

// вешаем проверку заполнения всех полей
function inputQuestionFocus(){

    const mainFormInputPlaceholder = questionField.placeholder;
    questionField.addEventListener("focus", function (e){
        questionField.placeholder = ""
    });

    questionField.addEventListener("blur", function (e){
        questionField.placeholder = mainFormInputPlaceholder;
    });
}
inputQuestionFocus(); // получаем фокус и анфокус на окне ввода вопроса

form.addEventListener('change', function (e) {
    const question = document.querySelector('#formName')
    const theme = document.querySelector('#formTheme')
    const answer = document.querySelector('input[name=answer]:checked')
    const fileSystem = document.querySelector('input[name=checkbox]:checked')

    if (question.value.length > 0 && theme.value !== '0' && answer && fileSystem) {
        btnCreate.removeAttribute('disabled')
    } else {
        btnCreate.setAttribute('disabled', true)
    }
});

const openPopUp = document.getElementById('open_pop_up');
const closePopUp = document.getElementById('pop_up_close');
const popUp = document.getElementById('pop_up');
const popuArea = document.querySelector('.popup__area')

function openAndClose(){
    openPopUp.addEventListener('click', function (e) {
        e.preventDefault();
        popUp.classList.add('active');
    })

    closePopUp.addEventListener('click', () => {
        popUp.classList.remove('active');
    })

    btnCancel.addEventListener('click', () => {
        popUp.classList.remove('active');
    })

    popuArea.addEventListener('click', () => {
        popUp.classList.remove('active');
    });
}

openAndClose();