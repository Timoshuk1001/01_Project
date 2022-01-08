let developersArr = null;

const avatarInput = document.getElementById('edit-avatar')
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
    const avatarEl = dev.avatar ? `<img src="${dev.avatar}" class="avatar" width="300" height="300">` : '';

    return `<div class="card">

                <div class="photo"><div>${avatarEl}</div></div>
                <div class="describe">
                    <div class="name">${dev.name}</div><div class="age">${dev.age}</div><div class="gender">${dev.gender}</div>
                    <div class="city">${dev.city}</div><div class="activity">${dev.activity}</div><div class="company">${dev.company}</div>
                    <div class="interests">${dev.interests}</div>
                    <button class="edit-btn" onclick="editData(${dev.id})"><img src="image/pngegg.png" width="30px" alt=""></button>
                </div>
                <br>
            </div>`
  }).join('');

  developers.innerHTML = cards;
}

function editData(id) {
  const dev = developersArr[id];

  // avatarInput.value = dev.avatar;
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
});

// крестик для закрытия мадалки ! = попапа
const closePopUp = document.querySelector('.pop_up_close');
const popUp = document.querySelector('.edit-dev-wrap');
function openAndClose(){
  closePopUp.addEventListener('click', () => {
    popUp.classList.remove('active');
  })
}
openAndClose();