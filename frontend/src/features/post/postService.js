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

const postService = {
  createPost,
  getPosts,
  getPost,
};

export default postService;
