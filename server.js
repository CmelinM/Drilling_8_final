require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user.router');
const bootcampRouter = require('./routers/bootcamp.router');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/bootcamps', bootcampRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bienvenido, este Server se ejecuta en el puerto ${PORT}, que tengas un buen día`);
});
