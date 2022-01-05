const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');



const urlencodedParser = express.urlencoded({extended: false});

const app = express();

var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    let extention = file.originalname.match(/(\.\w+)$/);

    cb(null, Date.now() + (extention ? extention[0] : '.jpg')) //Appending .jpg
  }
})

var upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// HTML, JS

app.get('/', (req, res) => {
  const index = fs.readFileSync('./dist/indexHome.html', 'utf8');
  res.send(index);
});
app.get('/', (req, res) => {
  const index = fs.readFileSync('./src/indexQuestion.html', 'utf8');
  res.send(index);
});

app.get('/script.js', (req, res) => {
  const index = fs.readFileSync('./dist/script.js', 'utf8');
  res.send(index);
});

// добавил файл js обработчик вопросов со второй странички
app.get('/scriptQuestionAllField.js', (req, res) => {
  const index = fs.readFileSync('./src/scriptQuestionAllField.js', 'utf8');
  res.send(index);
});

// при запросе каталога uploads, вручную указать откуда будет отправлен файл
app.get('/uploads/:filename', (req, res) => {
  res.sendFile(__dirname + req.path);
});

app.use(express.static("dist"));


// Data
app.get('/developers', (req, res) => {
  const devsFile = JSON.parse(fs.readFileSync('./developers.json', 'utf8'));

  res.set({
    "Content-Type": "application/json",
  });
  
  res.json(devsFile)
})

// upload.single - автоматом сохраняет файл, который был отправлен с инпута "avatar" в папку 'uploads/'
app.post('/developers', upload.single('avatar'), function (req, res) {
  // req.file is the name of your file in the form above, here 'avatar'
  // req.body will hold the text fields, if there were any

  const { name, age, gender, city, activity, company, interests } = req.body;
  const id = +req.body.id;

  const developers = JSON.parse(fs.readFileSync('./developers.json', 'utf8'));
  const avatar = req.file ? '/uploads/' + req.file.filename : developers[id].avatar; // после сохранения записываю путь файла в переменную avatar

  developers[id] = {
    id, avatar, name, age, gender, city, activity, company, interests
  }

  fs.writeFileSync('./developers.json', JSON.stringify(developers), 'utf8');

  res.sendStatus(200) // Отправить клиенту код 200, сообщив что запрос окончен
});

// function getFromJSONFile(URL, mode) {
//   if (typeof URL !== "object") {
//     return false;
//   }
//   /* Фунция чтения из файла JSON и фильтрации его,
//     если нужно по темам, которые приходят в query параметрах */
//   var bufferFromJsonFile = fs.readFileSync(questions/questions.json);
//   var arrayFromJson = [];
//   var parsedBuffer = JSON.parse(bufferFromJsonFile);
//   if (URL.get("theme") === "ALLTHEMES" || mode === 1) {
//     return parsedBuffer;
//   } else {
//     for (var i = 0; i < parsedBuffer.length; i++) {
//       if (parsedBuffer[i].theme === URL.get("theme")) {
//         arrayFromJson.push(parsedBuffer[i]);
//       }
//     }
//   }
//   return arrayFromJson;
// }

app.get('/questionJson', (req, res) => {
  let questionJson = [];
  const devsFile = JSON.parse(fs.readFileSync('./questionJson.json', 'utf8'));
  questionJson.push(devsFile);
  res.set({
    "Content-Type": "application/json",
  });

  res.json(devsFile)
})

app.post('/questionJson', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);


  const { id, question, theme,  answer, date } = req.body; //принимает данные
  const id2 = +req.body.id;
  const questionJson = JSON.parse(fs.readFileSync('./questionJson.json', 'utf8')); // читает файл

  questionJson.push ({ id, question, theme,  answer, date });// обновляет данные

  fs.writeFileSync('./questionJson.json', JSON.stringify(questionJson), 'utf8'); // записывает в обновленный массив
  res.sendStatus(200);

})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
});
