import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  post: {},
  isError: false,
  isLoading: false,
  isSucess: false,
  message: "",
};

// Create new post
export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const posts = thunkAPI.getState().post.posts;
      return await postService.createPost(postData, token);
    } catch (err) {
      console.log(err.response.data.message);

      const message = err.response.data.message || err.toString();
      return thunkAPI.rejectWithValue(message || "error");
    }
  }
);

// Get all posts

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getPosts(token);
    } catch (err) {
      console.log(err.response.data.message);
      const message = err.response.data.message || err.toString();
      return thunkAPI.rejectWithValue(message || "error");
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSucess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.post = {};
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.posts = action.payload.data;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.posts = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
