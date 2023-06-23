import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId, isLoggedIn }) => {
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) => {
    const postsArray = Object.values(state.posts);

    return currentId ? postsArray[1].find((p) => p._id === currentId) : null;
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData, navigate));
    } else {
      dispatch(createPost(postData, navigate));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return isLoggedIn === false ? (
    <Paper className={classes.paper} raised elevation={6}>
      <Typography variant="h6">
        Please Sign in For Creating/ Editing/ Deleting Your Own Memory
      </Typography>
    </Paper>
  ) : (
    <Paper className={classes.paper} raised elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {" "}
          {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          required
          //So This is very Important
          // Here
          // OnChnage function is taking an evenet e as an params
          // and it is updating the postData object from the useState
          // postData contains all the data or the post data of the
          // post to be made by the creator
          // So setPostData includes the previous postData values
          // and updates only that postData object property
          // which is specified in value by creator : e.target.value
          // ie creator property of postData is changed to e.t.value
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          required
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          required
          multiline
          rows={6}
          maxRows={10}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags ( Separated by Commas )"
          fullWidth
          required
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
          style={{ marginBottom: "10px" }}
        >
          Submit
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={clear}
          size="small"
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
