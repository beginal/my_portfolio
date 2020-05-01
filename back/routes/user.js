const express = require('express')
const bcrypt = require('bcrypt');
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

})
router.post('/login', (req, res) => {

})


router.get('/:id/posts', (req, res) => {
  
})

module.exports = router;