const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';


const app = next( { dev } ); 
const handle = app.getRequestHandler();


app.prepare().then( () => {
  const server = express();
  server.use(morgan('dev'))
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET))
  server.use(expressSession({
    resave: false,
    saveUninitialiized: false,
    secret: '',
    cookie: {
      httpOnly: true,
      secure: false,
    }
  }))

  server.get('/hashtag/:tag', (req, res) => {
    return app.render(req, res, '/hashtag', { tag: req.params.tag });
  }); 

  server.get('/user/:id', (req, res) => {
    return app.render(req, res, '/user', { id: req.params.id})
  });

  server.get('*', (req,res) => { // * 은 모든 요청을 여기서 처리하겠다는것
    return handle(req, res);
  })

  server.listen(3060, (err) => {
    console.log('3060 port is running')
  })
})

