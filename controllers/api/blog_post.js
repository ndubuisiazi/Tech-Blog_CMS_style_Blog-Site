const router = require('express').Router();
const { Posts, Comments } = require('../../models');

// CREATE New Post
router.post('/', async (req, res) => {
  try {

    
    const dbUserData = await Posts.create({
      author: req.session.user_id,
      blog_title: req.body.postTitle,
      blog_text: req.body.postText 
    }
    ); 

    req.session.save(() => {
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/comment', async (req, res) => {
  try {

    
    const dbUserData = await Comments.create({
      author: req.session.user_id,
      comment_text: req.body.commentText, 
      post_id: req.body.id,
    }
    ); 
    console.log(req.body)

    req.session.save(() => {
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;


