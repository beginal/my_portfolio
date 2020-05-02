const express = require('express')
const router = express.Router();
const db = require('../models');

router.post('/', async(req, res, next) => {
  try {
    const hashtag = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    })
    if (hashtag) {
    const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({  // 없으면 만들고 있으면 찾고
        where: { name: tag.slice(1).toLowerCase()},
      })));
      await newPost.addHashtags(result.map(r => r[0]));
    }
    const fullPost = await db.Post.findOne({
      where: { id : newPost.id },
      include: [{
        model: db.User,
      }]
    })
    console.log('hre',fullPost)
    return res.json(fullPost);
  } catch (e) {
    console.error(e)
    next(e)
  }
})

router.post('/images', (req, res) => {

})

module.exports = router;