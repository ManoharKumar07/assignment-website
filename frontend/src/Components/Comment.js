import { Button } from "@material-tailwind/react";
import React, { useContext } from "react";

function Comment({
  addComment,
  commentText,
  setcommentText,
  allComment,
  fullName,
  setFullName,
}) {
  console.log(allComment);
  return (
    <section className=" py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg lg:text-2xl font-bold">Make Comment</h2>
        </div>
        {/* Comment Form  */}
        <form className="mb-6">
          {/* Full Name Input  */}
          <div>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input input-bordered text-gray-200 input-primary hello w-full mb-4 py-2 px-4"
            />
          </div>

          {/* Text Area  */}
          <div
          //   className="py-2 px-4 mb-4 rounded-lg rounded-t-lg
          // shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200 "
          >
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              value={commentText}
              onChange={(e) => setcommentText(e.target.value)}
              className="textarea textarea-info w-full text-gray-200"
              placeholder="Write a comment..."
              required
              defaultValue={""}
            />
          </div>
          {/* Button  */}
          <Button
            className="btn btn-outline btn-primary text-sm mt-1"
            onClick={addComment}
          >
            Post comment
          </Button>
        </form>

        {/* Bottom Item  */}
        <article className="p-6 mb-6 text-base rounded-lg ">
          {allComment.map((item, index) => {
            const { fullName, date, commentText } = item;
            return (
              <>
                <footer className="flex justify-between items-center mb-">
                  <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg ">
                    <p className="inline-flex items-center mr-3 text-lg  ">
                      {fullName}
                    </p>
                    <p className="text-sm ">{date}</p>
                  </div>
                </footer>
                <p className="bg-[#C6C6C6] text-black p-[0.6rem] rounded-md dark:text-gray-400 text-md">
                  ↳ {commentText}
                </p>
              </>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default Comment;
