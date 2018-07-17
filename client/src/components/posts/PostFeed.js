import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const {posts} = this.props;
    console.log(posts)
    
    if(posts)  
    return (posts.map(post => <PostItem key={post._id} post={post} />))
    else
    return(<h1>Nothing</h1>)
    
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
