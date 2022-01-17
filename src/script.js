document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");
});

let developersArr = null;

const nameInput = document.getElementById('edit-name')
const ageInput = document.getElementById('edit-age')
const idInput = document.getElementById('edit-id')
const genderInput = document.getElementById('edit-gender')
const cityInput = document.getElementById('edit-city')
const activityInput = document.getElementById('edit-activity')
const companyInput = document.getElementById('edit-company')
const interestsInput = document.getElementById('edit-interests')
const form = document.getElementById('edit-dev');
const formWrap = document.querySelector('.edit-dev-wrap')
const submitAndCloseBtn = document.querySelector('.submit-and-close')


function loadData() {
  fetch('/developers')
    .then((data) => {
      return data.json()
    })
    .then((data) => {
      developersArr = data;

      renderCards(data);
    })
    .catch((e) => {
      console.log(e);
    })
}

loadData();


function renderCards(data) {
  const cards = data.map((dev) => {
    const avatarEl = dev.avatar ? `<img src="${dev.avatar}" class="avatar" width="150" height="150">` : '';

    return `<div class="card">
                <div class="user-card-header">
                    <div class="name">${dev.name}</div>
                    <button class="edit-btn" onclick="editData(${dev.id})"></button>
                </div>
                <div class="user-card-content">
                    <div class="photo">${avatarEl}</div>
                    <div class="describe">
                        <div class="param-row age">
                            <div class="param-name">Age:</div>
                            <div class="param-value">${dev.age}</div>
                        </div>
                        <div class="param-row gender">
                            <div class="param-name">Gender:</div>
                            <div class="param-value">${dev.gender}</div>
                         </div>
                        <div class="param-row city">
                            <div class="param-name">City:</div>
                            <div class="param-value">${dev.city}</div>
                        </div>
                        <div class="param-row activity">
                            <div class="param-name">Activity:</div>
                            <div class="param-value">${dev.activity}</div>
                        </div>
                        <div class="param-row company">
                            <div class="param-name">Company:</div>
                            <div class="param-value">${dev.company}</div>
                        </div>
                        <div class="param-row interests">
                            <div class="param-name">Interests:</div>
                            <div class="param-value">${dev.interests}</div>
                        </div>
                    </div>
                </div>
            </div>`
  }).join('');

  developers.innerHTML = cards;
}

function editData(id) {
  const dev = developersArr[id];

  nameInput.value = dev.name;
  ageInput.value = dev.age;
  genderInput.value = dev.gender;
  cityInput.value = dev.city;
  activityInput.value = dev.activity;
  companyInput.value = dev.company;
  interestsInput.value = dev.interests;
  idInput.value = dev.id;
  formWrap.classList.add('active')
  form.style.display = 'block';
  document.body.classList.add('hidden')
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch('/developers', {
    method: 'POST',
    body: new FormData(form),
  }).then(() => {
    loadData();
    form.style.display = 'none';
  });
  
});

submitAndCloseBtn.addEventListener('click',() =>{
  formWrap.classList.remove('active');
  document.body.classList.remove('hidden')
});

// крестик для закрытия мадалки ! = попапа
const closePopUp = document.querySelector('.pop_up_close');
const popUp = document.querySelector('.edit-dev-wrap');

function openAndClose(){
  closePopUp.addEventListener('click', () => {
    popUp.classList.remove('active');
    document.body.classList.remove('hidden')
  })
}

openAndClose();