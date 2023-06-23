import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId, isLoggedIn }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openPost = () => navigate(`/posts/${post._id}`);

  const user = JSON.parse(localStorage.getItem("profile"));

  const userName = user?.result?.name;
  console.log(userName);

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
        onClick={openPost}
      />
      <div className={classes.overlay} onClick={openPost}>
        <Typography variant="h6"> {post.creator} </Typography>
        <Typography variant="body2">
          {" "}
          {moment(post.createdAt).fromNow()}{" "}
        </Typography>
      </div>

      {post.creator === userName && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}

      <div className={classes.details} onClick={openPost}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <Typography
        className={classes.title}
        variant="h5"
        color="gutterBottom"
        onClick={openPost}
      >
        {post.title}
      </Typography>

      <CardContent onClick={openPost}>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>

      {isLoggedIn ? (
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(post._id))}
          >
            <ThumbUpAltIcon fontSize="small" />
            &nbsp; Like &nbsp;
            {post.likeCount}
          </Button>

          {post.creator === userName && (
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post._id))}
              style={{ color: "red" }}
            >
              <DeleteIcon fontSize="small" />
              &nbsp; Delete
            </Button>
          )}
        </CardActions>
      ) : (
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary">
            <ThumbUpOutlinedIcon fontSize="small" />
            &nbsp; Like &nbsp;
            {post.likeCount}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default Post;
