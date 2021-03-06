const express = require('express')
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn } = require('./middleware');

const router = express.Router();
const db = require('../models')

router.get('/', isLoggedIn, (req,res) => {
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});
router.post('/', async (req,res) => {
  try {
    const exuser = await db.User.findOne({
      where: {
        userId: req.body.userId
      },
    })
    if(exuser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
    })
    console.log(newUser);
    return res.json(newUser);
  } catch (e) {
    console.error(e)
    return next(e);
  }
})

router.get('/:id', async (req, res, next) => { // 남의 정보 가져오는 것 ex) /api/user/123
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      include: [{
        model: db.Post,
        attributes: ['id'],
      }],
      attributes: ['id', 'nickname'],
    });
    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/logout', (req, res) => {
req.logout();
req.session.destroy();
res.send('logout 성공')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.error(e)
      return next(err)
    }
    if(info) {
      return res.status(401).send(info.reason); 
    }
    return req.login(user, async (loginErr) => {
      try {
        if(loginErr) {
        return next(loginErr);
      }
      const fullUser = await db.User.findOne({
        where: { id: user.id },
        include: [{
          model: db.Post,
          attributes: ['id']
        }],
        attributes: ['id', 'nickname', 'userId']
      })
      return res.json(fullUser)
      } catch (e) {
        next(e)
      }      
    })
  })(req, res, next)
})


router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      where: {
        UserId: parseInt(req.params.id, 10),
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Image,
      }],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;