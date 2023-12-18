import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import Layout from "../Components/Layout";
import axios from "axios"; // Import axios

const itemsPerPage = 3;

const Assignmentview = () => {
  const [getAllBlog, setGetAllBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Replace this function with your actual logic for fetching user data

  async function getAllBlogs() {
    try {
      const q = query(collection(fireDB, "assignmentPost"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let blogArray = [];
        QuerySnapshot.forEach((doc) => {
          blogArray.push({ ...doc.data(), id: doc.id });
        });

        setGetAllBlog(blogArray);
      });

      return unsubscribe; // Correct cleanup function
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      unsubscribe = await getAllBlogs();
    };

    fetchData();

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe(); // Ensure to call unsubscribe to clean up the Firestore subscription
      }
    };
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = getAllBlog.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(getAllBlog.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mx-auto max-w-7xl">
            <div className="flex flex-wrap justify-center -m-4 mb-5 ">
              {currentItems.length > 0 ? (
                <>
                  {currentItems.map((item, index) => {
                    const { thumbnail, id, date } = item;
                    console.log(item);
                    return (
                      <div className="p-4 md:w-1/3 " key={index}>
                        <div
                          className={`h-full bg-[#32384E] shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400 rounded-md`}
                          style={{ height: "400px", width: "300px" }}
                        >
                          <img
                            onClick={() => navigate(`/assignmentinfo/${id}`)}
                            className="w-full h-40 object-cover rounded-t-md"
                            src={thumbnail}
                            alt="assignment"
                          />
                          <div className="p-6">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                              {date}
                            </h2>
                            <h1 className="title-font text-lg font-bold text-gray-100 mb-3">
                              {item.assignment.title}
                            </h1>
                            <h1 className="title-font text-xs font-bold text-[#FB7085] mb-3">
                              <span>Due Date :</span> {item.assignment.category}
                            </h1>
                            <div
                              className="leading-relaxed mb-3 text-gray-100"
                              dangerouslySetInnerHTML={{
                                __html: item.assignment.content,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold">Not Found</h1>
                </>
              )}
            </div>

            <div className="flex justify-center my-5">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-2 px-4 py-2 border rounded ${
                    currentPage === index + 1
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Assignmentview;
