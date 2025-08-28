const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

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
app.use(SortMiddleware);

app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
      //Sum order in displayed table
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        };
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `
        <a href="?_sort&column=${field}&type=${type}">
          <span class="${icon}"></span>
        </a>
        `;
      }
    }
}));             // defaults are fine
app.set('view engine', 'hbs');           // uses .handlebars extension
app.set('views', path.join(__dirname, 'resources', 'views'));
app.locals.year = new Date().getFullYear();

route(app);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
