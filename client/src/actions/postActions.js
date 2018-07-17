import axios from "axios";
import {
  ADD_POST,
  GET_POST,
  GET_POSTS,
  DELETE_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  POST_LOADING
} from "./types";


//Add Comment
export const addComment = (postId, CommentData) => dispatch => {
  dispatch(clearErrors())
  axios.post(`/api/posts/comment/${postId}`,CommentData)
  .then(res=> dispatch({
    type:GET_POST,
    payload:res.data
  }))
  .catch(err=> dispatch({
    type:GET_ERRORS,
    payload:err.response.data
  }))
}

//delete Comment 
export const deleteComment = (postId, commentId) => dispatch => {
  axios.delete(`/api/posts/comment/${postId}/${commentId}`)
  .then(res=> dispatch({
    type:GET_POST,
    payload:res.data
  }))
  .catch(err=> dispatch({
    type:GET_ERRORS,
    payload:err.response.data
  }))
}

//Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors())
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get Post
export const getPost = (postId) => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${postId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};


//Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//delete Post 
export const deletePost = (postId) => dispatch => {
    axios.delete(`/api/posts/${postId}`)
    .then( res => dispatch({
        type:DELETE_POST,
        payload:postId
    }))
    .catch( err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//Add like to a post using postId
//delete Post 
export const addLike = (postId) => dispatch => {
    axios.post(`/api/posts/like/${postId}`)
    .then( res => dispatch(getPosts()))
    .catch( err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//Remove like to a post using postId
//delete Post 
export const removeLike = (postId) => dispatch => {
    axios.post(`/api/posts/unlike/${postId}`)
    .then( res => dispatch(getPosts()))
    .catch( err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//Clear Errors
export const clearErrors=() => {
  return {
    type:CLEAR_ERRORS
  }
}

//Set Loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
