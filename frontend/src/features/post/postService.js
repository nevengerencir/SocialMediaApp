import axios from "axios";
const API_URL = "/api/posts/";

const createPost = async (postData, token) => {
  if (!postData.image) {
    const response = await axios.post(`${API_URL}`, postData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(`${API_URL}/picture`, postData, config);
  console.log(response.data);
  return response.data.data;
};
// Create a comment
const createComment = async (commentData, token) => {
  const { id } = commentData;
  const response = await axios.post(`${API_URL}/${id}/comments`, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

const getPosts = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
const getPost = async (postId, token) => {
  const response = await axios.get(`${API_URL}/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const deletePost = async (postId, token) => {
  const response = await axios.delete(`${API_URL}/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const postService = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  createComment,
};

export default postService;
