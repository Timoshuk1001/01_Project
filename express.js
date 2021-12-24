import express from "express"
import path from 'path'

const app = express();
const __dirname = path.resolve();

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'indexHome.html'))
})
app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'indexQuestions.html'))
})
app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'indexAbout.html'))
})
app.use(express.static(__dirname + '/src'));



app.listen(3000, () => {
    console.log('server work')
})