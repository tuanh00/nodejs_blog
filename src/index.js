const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined')); // or 'dev' in development

app.engine('hbs', engine({
    extname: '.hbs'
}));             // defaults are fine
app.set('view engine', 'hbs');           // uses .handlebars extension
app.set('views', path.join(__dirname, 'resources', 'views'));

app.get('/', (req, res) => res.render('home'));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
