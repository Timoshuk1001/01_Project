const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');



const urlencodedParser = express.urlencoded({extended: false});

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// HTML, JS

app.get('/', (req, res) => {
  const index = fs.readFileSync('./src/indexHome.html', 'utf8');
  res.send(index);
});

app.get('/script.js', (req, res) => {
  const index = fs.readFileSync('./script.js', 'utf8');
  res.send(index);
});


app.use(express.static("src"));


// Data
app.get('/developers', (req, res) => {
  const devsFile = JSON.parse(fs.readFileSync('./developers.json', 'utf8'));

  res.set({
    "Content-Type": "application/json",
  });
  
  res.json(devsFile)
})

app.post('/developers', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);

  const { id, avatar, name, age, gender, city, activity, company, interests } = req.body;
  
  const developers = JSON.parse(fs.readFileSync('./developers.json', 'utf8'));

  developers[id] = {
    id, avatar, name, age, gender, city, activity, company, interests
  }

  fs.writeFileSync('./developers.json', JSON.stringify(developers), 'utf8');

  res.send(400);
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})