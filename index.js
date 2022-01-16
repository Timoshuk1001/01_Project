const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const yamlParser = require("js-yaml");
const YAML = require("json-to-pretty-yaml");



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

// при запросе каталога uploads, вручную указать откуда будет отправлен файл
app.get('/uploads/:filename', (req, res) => {
  res.sendFile(__dirname + req.path);
});

// добавил файл js обработчик вопросов со второй странички
app.get('/scriptQuestionAllField.js', (req, res) => {
  const index = fs.readFileSync('./dist/scriptQuestionAllField.js', 'utf8');
  res.send(index);
});

app.use(express.static("dist"));


// Data developers
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


//Data questionJson
app.get('/questionJSON', (req, res) => {
  //let questionJson = [];
  const questsFile = JSON.parse(fs.readFileSync('./questionJson.json', 'utf8'));

  res.set({
    "Content-Type": "application/json",
  });

  res.json(questsFile)
})

app.post('/questionJSON', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);

  fs.writeFileSync('./questionJson.json', JSON.stringify(req.body), 'utf8'); // записывает в обновленный массив
  res.sendStatus(200);

})

//Data questionYAML
app.get('/questionYAML', (req, res) => {
  const str = fs.readFileSync('./questionYAML.yaml', 'utf8');
  const arr = yamlParser.load(str);


  res.set({
    "Content-Type": "application/json",
  });

  res.json(arr)
})


app.post('/questionYAML', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);

  fs.writeFileSync('./questionYAML.yaml', YAML.stringify(req.body), 'utf8'); // записывает в обновленный массив
  res.sendStatus(200);
})



//Data questionCSV
app.get('/questionCSV', (req, res) => {
  const str = fs.readFileSync('./questionCSV.csv', 'utf8');
  const arr = csv2arrParser(str);
  //res.send(str);

  res.set({
    "Content-Type": "application/json",
  });

  res.json(arr)

});

function arr2csvParser(arr) {
  let result = '';
  if(arr.length === 0){
    return '';
  }
  let headers = Object.keys(arr[0]).join(';');
  result += headers + '\n';
  for (let el of arr) {
    let row = Object.values(el).join(';');
    result += row + '\n';
  }

  return result.trim();
}

// post

function csv2arrParser(string) {
  let result = [];

  let rows = string.split('\n');
  if (rows.length <=1) {
    return  result;
  }
  let keys = rows[0].split(';');

  for (let i = 1; i < rows.length; i++) {
    let values = rows[i].split(';');

    result.push(
        values.reduce((acc, val, i) => {
          acc[keys[i]] = isNaN(val) ? val : +val;
          return acc;
        }, {})
    )
  }

  return result;
}

app.post('/questionCSV', urlencodedParser, (req, res) => {
  //console.log(req.body)
  if(!req.body) return res.sendStatus(400);
  fs.writeFileSync('./questionCSV.csv', arr2csvParser(req.body), 'utf-8'); // записывает в обновленный массив
  res.sendStatus(200);

})


//XML

app.get('/questionXML', (req, res) => {
  const str = fs.readFileSync('./questionXML.xml', 'utf8');
  let arr = parseXml(str);
  arr = arr.map((el) => {
      el.id = +el.id
      return el
    })

  res.set({
    "Content-Type": "application/json",
  });

  res.json(arr)

});

function convertToXML(array) {
  if(!array || !Array.isArray(array)){
    return '';
  }

   let result = "<questions>\n";

    for (let i = 0; i < array.length; i++) {
      let wrapper = "<body>";
      if (array[i] === null || array[i] === undefined) {
        break;
      }
      for (let key in array[i]) {
        wrapper += "<"+`${key}`+">"+`${array[i][key]}`+"</"+`${key}`+">";
      }

      result = result + wrapper + "</body>\n" ;
    }
    result = result + "</questions>";
    return result
}


function parseXml(xml) {
  let arr = [];
  for (let body of xml.matchAll(/<body>(.+)<\/body>/g)) {
    let json = {}
    for (const res of body[1].matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
      const key = res[1];
      json[key] = res[2];
    }
    arr.push(json);
  }
  return arr
}


app.post('/questionXML', urlencodedParser, (req, res) => {
  console.log(req.body)
  if(!req.body) return res.sendStatus(400);
  fs.writeFileSync('./questionXML.xml', convertToXML(req.body), 'utf-8'); // записывает в обновленный массив
  res.sendStatus(200);

})






///
app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
});
