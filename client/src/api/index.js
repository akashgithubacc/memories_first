import axios from "axios";

const url = "http://localhost:3000/posts";

export const fetchPosts = (page) => axios.get(`?page=${page}`);

export const createPost = (newPost) => axios.post("/", newPost);

export const updatePost = (id, updatedPost) =>
  axios.patch(`/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`/${id}`, id);

export const likePost = (id) => axios.patch(`/${id}/likePost`, id);

export const fetchPostsBySearch = (searchQuery) =>
  axios.get(
    `/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    } `
  );

export const fetchPost = (id) => axios.get(`/${id}`);
