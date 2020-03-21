const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express;
const exphbs = require('express-handlebars');
const routes = require('./controllers/burgers_controller');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(routes);

app.listen(PORT, function() {
    console.log('Listening on: http://localhost:' + PORT);
  });