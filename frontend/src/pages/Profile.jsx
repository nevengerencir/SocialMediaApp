import { useState } from "react";

function Profile() {
  const [postData, setPostData] = useState({
    image: null,
    text: "",
  });

  const onChange = (e) => {
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h1>Your profile</h1>
      <form>
        {/* <input
          class="max-w-3xl p-4 mt-10 border rounded-lg cursor-pointer text-gray-400 focus:outline-none "
          name="img"
          type="file"
        /> */}
        <div class="w-4/12 mt-10">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer "
          >
            <div class="flex flex-col items-center justify-center p-4">
              <svg
                aria-hidden="true"
                class="w-6 h-6 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
            </div>
            <input
              name="image"
              id="dropzone-file"
              type="file"
              class="hidden"
              onChange={onChange}
            />
          </label>
        </div>
        <textarea
          onChange={onChange}
          id="message"
          rows="4"
          class="block p-4  text-lg md:text-xl w-10/12 mt-10 text-gray-600 rounded border resize-none focus:outline-none"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button className="submit-button max-w-sm text-white  bg-black">
          Submit
        </button>
      </form>
    </>
  );
}
export default Profile;
