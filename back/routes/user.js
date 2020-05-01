const express = require('express')
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();
const db = require('../models')

router.get('/', (req,res) => {
  
});
router.post('/', async (req,res) => {
  try {
    const exuser = await db.User.findOne({
      where: {
        userId: req.body.userId
      },
    })
    if(exuser) {
      return res.status(400).send('이미 사용중인 아이디입니다.');
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
    console.log(err, user, info)
    if(err) {
      console.error(e)
      next(err)
    }
    if(info) {
      return res.status(401).send(info.reason); 
    }
    return req.login(user, (loginErr) => {
      if(loginErr) {
        return next(loginErr);
      }
      console.log('req.user',req.user)
      const filteredUser = Object.assign({}, user.toJSON());
      delete filteredUser.password;
      return res.json(filteredUser)
    })
  })(req, res, next)
})


router.get('/:id/posts', (req, res) => {
  
})

module.exports = router;