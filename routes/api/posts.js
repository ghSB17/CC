const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const passport = require("passport");

const validatePostInput = require("../../validation/post");
//@route: GET to /api/posts/test
//@desc: Testing the GET route
//@access: public
router.get("/test", (req, res) => {
  res.json({ msg: "testing /api/posts/test" });
});

//@route: POST to /api/posts
//@desc: Create a Post
//@access: private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newpost = new Post({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id
    });
    newpost
      .save()
      .then(post => res.json(post))
      .catch(err => console.log(err));
  }
);

//@route: GET to /api/posts
//@desc: Get all the posts
//@access: public
router.get("/", (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No Posts Found!!" }));
});

//@route: GET to /api/posts/:postId
//@desc: Get one post by Id
//@access: public
router.get("/:postId", (req, res) => {
  Post.findById(req.params.postId)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: "No Post Found!!" }));
});

//@route: DELETE to /api/posts/:postId
//@desc: Delete one post by Id
//@access: private
router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postId)
      .then(post => {
        if (req.user.id !== post.user.toString()) {
          return res.status(401).json({ notauthorized: "Unauthorized User" });
        }
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ nopostfound: "No Post Found!!" }));
  }
);

//@route: POST to /api/posts/like/:postId
//@desc: Like one post by Id
//@access: private
router.post(
  "/like/:postId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postId)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already Liked this post" });
        }
        post.likes.unshift({ user: req.user.id });
        post.save().then(newpost => res.json(newpost));
      })
      .catch(err => res.status(404).json({ nopostfound: "No Post Found!!" }));
  }
);

//@route: POST to /api/posts/unlike/:postId
//@desc: UnLike one post by Id
//@access: private
router.post(
  "/unlike/:postId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postId)
      .then(post => {
        console.log(post);
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "User did not Like this post" });
        }
        const removeindex = post.likes
          .map(like => like.user.toString())
          .indexOf(req.params.postId);

        post.likes.splice(removeindex, 1);
        post.save().then(newpost => res.json(newpost));
      })
      .catch(err => res.status(404).json({ nopostfound: "No Post Found!!" }));
  }
);

//@route: POST to /api/posts/comment/:postId
//@desc: Add a comment to a post by postId
//@access: private
router.post(
  "/comment/:postId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.postId)
      .then(post => {
        const newcomment = {
          user: req.user.id,
          name: req.user.name,
          avatar: req.user.avatar,
          text: req.body.text
        };
        post.comments.unshift(newcomment);
        post.save().then(newpost => res.json(newpost));
      })
      .catch(err => res.status(404).json({ nopostfound: "No Post Found" }));
  }
);

//@route: DELETE to /api/posts/comment/:postId/:commentId
//@desc: Delete a comment from a post by postId and commentId
//@access: private
router.delete(
  "/comment/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postId)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.commentId
          ).length === 0
        ) {
          return res.status(400).json({ commentnotexists: "No Comment Found!!" });
        }

        const removeindex = post.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.commentId);

        post.comments.splice(removeindex, 1);
        post.save().then(newpost => res.json(newpost));
      })
      .catch(err => res.status(404).json({ nopostfound: "No Post Found!!" }));
  }
);

module.exports = router;
