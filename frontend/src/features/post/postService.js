import axios from "axios";
const API_URL = "/api/posts/";

const createPost = async (postData, token) => {
  if (!postData.image) {
    const response = await axios.post(`${API_URL}`, postData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(`${API_URL}/picture`, postData, config);
  return response.data;
};

const postService = {
  createPost,
};

export default postService;
