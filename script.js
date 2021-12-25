let developersArr = null;

const nameInput = document.getElementById('edit-name')
const ageInput = document.getElementById('edit-age')
const idInput = document.getElementById('edit-id')
const form = document.getElementById('edit-dev');

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
    return `<span class="name">${dev.name}</span> <b class="age">${dev.age}</b><button onclick="editData(${dev.id})">edit</button><br>`
  }).join('');

  developers.innerHTML = cards;
}

function editData(id) {
  const dev = developersArr[id];

  nameInput.value = dev.name;
  ageInput.value = dev.age;
  idInput.value = dev.id;
  form.style.display = 'block';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const updatedData = {
    id: +idInput.value,
    name: nameInput.value,
    age: +ageInput.value
  }

  fetch('/developers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData),
  }).then(() => {
    loadData();
    nameInput.value = ''
    ageInput.value = '';
    idInput.value = '';
    form.style.display = 'none';
  });
  
})

