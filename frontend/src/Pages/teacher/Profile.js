import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [teacher, setTeacher] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // update teacher ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/teacher/updateProfile",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  // update teacher ==========

  //get Teacher Details
  const getTeacherInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/teacher/getTeacherInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setTeacher(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeacherInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h4 className="text-lg mb-3 pt-4 font-bold text-[#DDE7EE]">
        Manage Profile :{" "}
      </h4>
      {teacher && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...teacher,
          }}
        >
          <h4 className="">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={
                  <span className="text-base font-bold text-[#DDE7EE]">
                    First Name
                  </span>
                }
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="your first name"
                  className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={
                  <span className="text-base font-bold text-[#DDE7EE]">
                    Last Name
                  </span>
                }
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="your last name"
                  className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={
                  <span className="text-base font-bold text-[#DDE7EE]">
                    Phone no
                  </span>
                }
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="your contact no"
                  className="input  input-bordered text-gray-200 input-primary w-full hello max-w-xs "
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={
                  <span className="text-base font-bold text-[#DDE7EE]">
                    Email
                  </span>
                }
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="email"
                  placeholder="your email address"
                  className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input
                  type="text"
                  placeholder="your website"
                  className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs  hello"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={
                  <span className="text-base font-bold text-[#DDE7EE]">
                    Address
                  </span>
                }
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="your address"
                  className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
                />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={
                  <span className="text-base font-bold text-[#DDE7EE]">
                    Specialization
                  </span>
                }
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="your specialization"
                  className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={
                  <span className="text-base font-bold text-[#DDE7EE]">
                    Experience
                  </span>
                }
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="your experience"
                  className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}></Col>
          </Row>
          <button
            className="btn btn-primary form-btn bg-blue-500 ml-[32rem]"
            type="submit"
          >
            Update
          </button>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
