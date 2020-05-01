const express = require('express');
const db = require('./models');
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')
const dotenv = require('dotenv')

const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');

const app = express();
db.sequelize.sync();
dotenv.config()

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false, // 매번 세션 강제 저장
  saveUninitialized: false, // 빈 값도 저장
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, //https를  쓸때  true로

  }
}));

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);


app.listen(3065, () => {
  console.log(`server is running on localhost:3065`);

})