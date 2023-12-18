import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireDB, storage } from "../firebase/FirebaseConfig";
import { message } from "antd";

function Bookingpage() {
  const [assignment, setAssignment] = useState({
    title: "",
    category: "",
    content: "",
    time: Timestamp.now(),
  });
  const [thumbnail, setthumbnail] = useState();

  const [text, settext] = useState("");
  console.log("Value: ");
  console.log("text: ", text);

  const navigate = useNavigate();
  const addPost = async () => {
    if (
      assignment.title === "" ||
      assignment.category === "" ||
      assignment.content === "" ||
      !thumbnail
    ) {
      message.error("Please Fill All Fields");
      return; // Return to prevent further execution
    }

    try {
      await uploadImage();
      message.success("Post Added Successfully");
      console.log("Before navigation");
      navigate("/");
      console.log("After navigation");
    } catch (error) {
      message.error(error);
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!thumbnail) return;

    const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
    const snapshot = await uploadBytes(imageRef, thumbnail);
    const url = await getDownloadURL(snapshot.ref);

    const productRef = collection(fireDB, "assignmentPost");

    try {
      await addDoc(productRef, {
        assignment,
        thumbnail: url,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
    } catch (error) {
      throw error; // Re-throw the error to be caught by the calling function
    }
  };

  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" container mx-auto max-w-5xl py-6 text-white">
      <div className="p-5">
        {/* Top Item  */}
        <div className="mb-2 flex justify-between">
          <div className="flex gap-2 items-center">
            {/* Dashboard Link  */}
            <Link to={"/"}>
              <BsFillArrowLeftCircleFill size={25} />
            </Link>

            {/* Text  */}
            <Typography variant="h4">Post Assignment</Typography>
          </div>
        </div>

        {/* main Content  */}
        <div className="mb-3">
          {/* Thumbnail  */}
          {thumbnail && (
            <img
              className=" w-full rounded-md mb-3 "
              src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
              alt="thumbnail"
            />
          )}

          {/* Text  */}
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-semibold"
          >
            Upload Thumbnail
          </Typography>

          {/* First Thumbnail Input  */}
          <input
            type="file"
            label="Upload thumbnail"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
            onChange={(e) => setthumbnail(e.target.files[0])}
          />
        </div>

        {/* Second Title Input */}
        <div className="mb-3">
          <input
            className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
            label={
              <span className="text-base font-bold text-[#DDE7EE]">
                Enter title
              </span>
            }
            placeholder="Enter Your Title"
            name="title"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </div>

        {/* Third Category Input  */}
        <div className="mb-3">
          <input
            className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
            label={
              <span className="text-base font-bold text-[#DDE7EE]">
                Enter due date
              </span>
            }
            placeholder="Enter Due date"
            name="category"
            value={assignment.category}
            onChange={(e) =>
              setAssignment({ ...assignment, category: e.target.value })
            }
          />
        </div>

        {/* Four Editor  */}
        <Editor
          apiKey="9jo3lu73p1xbfqaw6jvgmsbrmy7qr907nqeafe1wbek6os9d"
          onEditorChange={(newValue, editor) => {
            setAssignment({ ...assignment, content: newValue });
            settext(editor.getContent({ format: "text" }));
          }}
          onInit={(evt, editor) => {
            settext(editor.getContent({ format: "text" }));
          }}
          init={{
            forced_root_block: "", // Set to empty string to disable wrapping with any block tag
            formats: {
              removeformat: [
                {
                  selector: "*",
                  remove: "all",
                  split: true,
                  expand: false,
                  block_expand: true,
                },
              ],
            },
            plugins:
              "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
          }}
        />

        {/* File Submit Button  */}
        <Button className=" bg-black w-full mt-5" onClick={addPost}>
          Send
        </Button>

        {/* Six Preview Section  */}
        <div className="">
          <h1 className=" text-center mb-3 text-2xl">Preview</h1>
          <div className="content">
            <div
              dangerouslySetInnerHTML={createMarkup(assignment.content)}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookingpage;
