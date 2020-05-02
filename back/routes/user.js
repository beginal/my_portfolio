const express = require('express')
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();
const db = require('../models')

router.get('/', (req,res) => {
  if (!req.user) {
    return res.status(401).send('로그인이 필요합니다.');
  }
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

router.get('/:id', (req, res) => {

})
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
      console.log(fullUser)
      return res.json(fullUser)
      } catch (e) {
        next(e)
      }      
    })
  })(req, res, next)
})


router.get('/:id/posts', (req, res) => {
  
})

module.exports = router;