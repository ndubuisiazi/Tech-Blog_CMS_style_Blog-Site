const router = require('express').Router();
const { Posts, Comments,User } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostsData = await Posts.findAll();

    const posts = dbPostsData.map((Posts) =>
      Posts.get({ plain: true })
    );


    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
    console.log(posts)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const dbPostsData = await Posts.findAll({
      where: {
        author: req.session.user_id
      }});

    const posts = dbPostsData.map((Posts) =>
      Posts.get({ plain: true })
    );

    console.log(req.session.user_id)


    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
    console.log(posts)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/homepage', async (req, res) => {
  try {
    const dbPostsData = await Posts.findAll({
      include: [
        {
          model: Comments,
          attributes: ['author', 'comment_text'],
        },
      ],
    });

    const posts = dbPostsData.map((Posts) =>
      Posts.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/update/:id', async (req, res) => {
  try {
      const userData = await Posts.findOne({
          where: {
            id: req.params.id
          },
          include: {
              model: Comments,
          }
      });
      if (!userData) res.status(404).json({"messange": "there is no users"});
      else {
          var posts = userData.get({ plain: true});
          var author = posts.author
          var blog_text = posts.blog_text
          var blog_title = posts.blog_title
          var dateposted = posts.createdAt
          var id =posts.id,
          comments = posts.Comments;
          
        
          // console.log(comments)
          res.render('editView', {
              author,
              blog_text,
              blog_title,
              dateposted,
              id,
              loggedIn: req.session.loggedIn,
              comments
              
          });
      }
  } catch(err) {
      res.status(400).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
      const userData = await Posts.findOne({
          where: {
            id: req.params.id
          },
          include: {
              model: Comments,
          }
      });
      if (!userData) res.status(404).json({"messange": "there is no users"});
      else {
          var posts = userData.get({ plain: true});
          var author = posts.author
          var blog_text = posts.blog_text
          var blog_title = posts.blog_title
          var dateposted = posts.createdAt
          var id =posts.id,
          comments = posts.Comments;
          
          console.log(posts.id)
          // console.log(comments)
          res.render('postView', {
              author,
              blog_text,
              blog_title,
              dateposted,
              id,
              loggedIn: req.session.loggedIn,
              comments
              
          });
      }
  } catch(err) {
      res.status(400).json(err);
  }
});


// GET one Posts
// router.get('/posts/:id', async (req, res) => {
//   try {
//     const dbPostsData = await Posts.findAll({
//       where: 
//       {id: req.params.id},
//       include: 
//       {model: Painting}
//       });

//     const posts = dbPostsData.map((Posts) =>
//       Posts.get({ plain: true })
//     );
//     console.log(posts)
//     res.render('homepage', {
//       posts,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
module.exports = router;
