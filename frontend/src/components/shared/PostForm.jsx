import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createPost } from "../../features/post/postSlice";

function PostForm() {
  const [postData, setPostData] = useState({
    image: undefined,
    text: "",
  });

  const onChange = (e) => {
    {
      console.log(123);
      setPostData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);

    setPostData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.files[0],
    }));
  };

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (postData.image) {
      if (!postData.image.name.match(/\.(jpg|jpeg|png|)$/i)) {
        return toast.error("Please make sure your Image is jpg/jpeg/png file.");
      }
    }
    if (postData.text.length < 10) {
      return toast.error("Please include atleast 10 characters");
    }

    dispatch(createPost(postData));
    setPostData({
      image: "",
      text: "",
    });
  };

  return (
    <div className="border px-10 py-4 mt-12 rounded-xl shadow-xl">
      <h2>Create New Post</h2>
      <form className="mt-8" onSubmit={onSubmit}>
        <label className="block mb-2 text-sm font-medium" htmlFor="file_input">
          Upload image
        </label>
        <input
          className="block max-3xl text-sm  rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
          id="image_input"
          name="image"
          onChange={handleFileChange}
          type="file"
        ></input>

        <textarea
          onChange={onChange}
          name="text"
          value={postData.text}
          rows="4"
          className="block pt-2 pl-2  text-lg md:text-xl w-10/12 mt-10 text-gray-600 rounded border resize-none focus:outline-none"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button className="submit-button max-w-xs text-white  bg-black">
          Submit
        </button>
      </form>
    </div>
  );
}
export default PostForm;
