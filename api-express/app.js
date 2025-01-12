var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors')
const connectMongoDB = require('./app/config/database')
const usersRouter = require('./app/routes/users');
const notesRouter = require('./app/routes/notes')
connectMongoDB()

var app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:3000', // URL do front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true // Se for necessário enviar cookies
}));

app.use('/users', usersRouter); //Rota do usuário
app.use('/notes', notesRouter) //Rota das notas


// Captura 404 e encaminha para o manipulador de erros
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

module.exports = app;
