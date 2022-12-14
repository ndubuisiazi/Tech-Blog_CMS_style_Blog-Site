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

router.delete("/delete/:id", async(req, res) => {
  try {
      var postId = req.params.id
      console.log(postId);
      var postDelete = await Posts.destroy({
          where: { 
            id: postId
          }
          
      });
      if (postDelete) res.status(200).json(postDelete);
      res.render('dashboard');
  } catch (err) {
      res.status(400).json(err);
  }
})

router.put("/updatepost/:idu", async(req, res) => {
  try {
      var postId = req.params.idu
      var updatedtext = req.body.newtext
      console.log(postId);
      var postUpdate = await Posts.update({blog_text: updatedtext},{
          where: { 
            id: postId
          }
          
      });
      if (postUpdate) res.status(200).json(postUpdate);
      console.log("newtext")
      console.log(postId);
      console.log(req.body.newtext)
      // res.render('dashboard');
  } catch (err) {
      res.status(400).json(err);
  }
})



module.exports = router;


