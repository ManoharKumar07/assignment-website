import Layout from "../Components/Layout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import Comment from "../Components/Comment";
import toast from "react-hot-toast";

function AssignmentInfo() {
  const params = useParams();

  const [getBlogs, setGetBlogs] = useState();

  const getAllBlogs = async () => {
    try {
      const productRef = doc(fireDB, "assignmentPost", params.id);
      const productTemp = await getDoc(productRef);

      if (productTemp.exists()) {
        setGetBlogs(productTemp.data());
      } else {
        console.error("Document does not exist");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    getAllBlogs();
    window.scrollTo(0, 0);
  }, [params.id]);

  //* Create markup function
  function createMarkup(content) {
    return { __html: content };
  }

  const [fullName, setFullName] = useState("");
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    const commentRef = collection(
      fireDB,
      `assignmentPost/${params.id}/comment`
    );
    try {
      await addDoc(commentRef, {
        fullName,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success("Comment Added Successfully");
      setFullName("");
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  const [allComment, setAllComment] = useState([]);

  const getcomment = async () => {
    try {
      const q = query(
        collection(fireDB, `assignmentPost/${params.id}/comment`),
        orderBy("time")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllComment(productsArray);
        console.log(productsArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcomment();
    window.scrollTo(0, 0);
  }, [params.id]);

  console.log(getBlogs?.assignment?.title);

  return (
    <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4 ">
        <div className="py-4 lg:py-8 max-h-screen">
          {getBlogs && (
            <div>
              {/* Thumbnail */}
              <img
                alt="content"
                className="mb-3 rounded-lg h-auto w-full max-h-screen object-cover"
                src={getBlogs.thumbnail}
              />
              {/* title And date */}
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-xl md:text-2xl lg:text-2xl font-semibold">
                  {getBlogs.assignment?.title}
                </h1>
                <p>{getBlogs.date}</p>
              </div>
              <div className={`border-b mb-5`} />

              {/* blog Content */}
              <div
                className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                      
                  [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
                 

                  [&>h3]:text-[18.72] [&>h3]:font-bold [&>h3]:mb-2.5
                  

                  [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
                 
                  [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
                  
                  [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
                

                  [&>p]:text-[16px] [&>p]:mb-1.5
                 

                  [&>ul]:list-disc [&>ul]:mb-2
                  

                  [&>ol]:list-decimal [&>li]:mb-10
                

                  [&>li]:list-decimal [&>ol]:mb-2
                 

                  [&>img]:rounded-lg
                  `}
                dangerouslySetInnerHTML={createMarkup(
                  getBlogs.assignment?.content
                )}
              ></div>
            </div>
          )}
        </div>
        <br />
        <br />
        <br />

        <Comment
          addComment={addComment}
          commentText={commentText}
          setcommentText={setCommentText}
          allComment={allComment}
          fullName={fullName}
          setFullName={setFullName}
        />
      </section>
    </Layout>
  );
}

export default AssignmentInfo;
