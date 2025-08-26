const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')

const app = express();
const port = process.env.PORT || 3000;

const route = require('./routes'); //import index.js automatically


const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(morgan('combined')); // or 'dev' in development

app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
      //Sum order in displayed table
      sum: (a, b) => a + b
    }
}));             // defaults are fine
app.set('view engine', 'hbs');           // uses .handlebars extension
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
