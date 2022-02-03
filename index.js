const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

app.set('trust proxy', true)
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
})

server.listen(2080, () => {
    console.log('Serving on port 2080');
})