import { FormEvent, useRef } from "react"
import { axiosWithAuthInstance } from "../services/axiosInstance";
import { useNavigate } from "react-router";

export default function PostNew() {
  const navigate = useNavigate();
  const titleInput = useRef<HTMLInputElement>(null);
  const contentTextarea = useRef<HTMLTextAreaElement>(null);
  const publishNowCheckbox = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosWithAuthInstance.post("/posts", {
        title: titleInput.current?.value,
        content: contentTextarea.current?.value,
        published_at: publishNowCheckbox.current?.checked ? new Date() : null
      });
  
      if (response.status === 200) {
        navigate("/");
      } else {
        throw new Error("something went wrong...");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-5">
      <h1 className="text-xl text-center font-bold">Add new post</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-3">
          <label htmlFor="title">Post title:</label>
          <input ref={titleInput} type="text" name="title" id="title" className="border-1 focus:outline-1" />
        </div>

        <div className="flex flex-col mt-3">
          <label htmlFor="content">Content:</label>
          <textarea ref={contentTextarea} name="content" id="content" className="border-1 focus:outline-1"></textarea>
        </div>

        <input ref={publishNowCheckbox} type="checkbox" name="publishNow" id="publishNow" />
        <label htmlFor="publishNow">Publish now</label>

        <button type="submit" className="bg-indigo-400 hover:bg-indigo-300 active:bg-indigo-500 active:text-white py-2 mt-3 w-full cursor-pointer">Post</button>
      </form>
    </div>
  )
}
