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
      assignment.thumbnail === ""
    ) {
      message.error("Please Fill All Fields");
    }
    // console.log(blogs.content)
    uploadImage();
  };

  const uploadImage = () => {
    if (!thumbnail) return;
    const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
    uploadBytes(imageRef, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const productRef = collection(fireDB, "assignmentPost");
        try {
          addDoc(productRef, {
            assignment,
            thumbnail: url,
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          });
          navigate("/");
          message.success("Post Added Successfully");
        } catch (error) {
          message.error(error);
          console.log(error);
        }
      });
    });
  };

  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" container mx-auto max-w-5xl py-6">
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
            label="Enter your Title"
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
            label="Enter your Subject"
            placeholder="Enter Your Subject"
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
            plugins:
              "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template  tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
          }}
        />

        {/* File Submit Button  */}
        <Button className=" bg-black w-full mt-5" onClick={addPost}>
          Send
        </Button>

        {/* Six Preview Section  */}
        <div className="">
          {/* <h1 className=" text-center mb-3 text-2xl">Preview</h1> */}
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
