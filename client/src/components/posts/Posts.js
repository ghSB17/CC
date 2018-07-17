import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import PostFeed from "./PostFeed";
// import axios from "axios";

class Posts extends Component {

  componentWillMount() {
    this.props.getPosts()
  }
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
   
      const { posts, loading } = this.props.post;
      const { user } = this.props.auth;
      let postContent;
      let postform;
      if (user.admin) {
        postform = <PostForm />;
      } else {
        postform = <div />;
      }

      if (posts === null || loading) {
        postContent = <Spinner />;
      } else {
        postContent = <PostFeed posts={posts} />;
      }

      return (
        <div className="feed">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {" "}
                {postform} {postContent}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      );
    
  }
}

Posts.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getPosts
  }
)(Posts);
