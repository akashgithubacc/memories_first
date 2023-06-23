import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionTypes";
//Action Creators

// here, to fetch all the data from the api, it is going to be an
// asynchronized functions, so we have to use thunk here to use async
// thunk allows us to do async(dispatch)
// and as we have used redux thunk, so instead of returning action in
// fetchPosts we need to do dispatch(action) instead of return action

export const getPosts = (page) => async (dispatch) => {
  try {
    // to catch all the data from the backend api

    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPosts(page);
    console.log(data);

    // so as dispatch takes action as an input and
    // action has a type and a payload,  so

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    // to catch all the data from the backend api

    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    // so as dispatch takes action as an input and
    // action has a type and a payload,  so

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    navigate(`/posts/${data._id}`);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updatePost(id, post);
    navigate(`/posts/${data._id}`);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
