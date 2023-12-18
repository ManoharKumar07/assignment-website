import React from "react";
import Layout from "../Components/Layout";
import { Col, Form, Input, Row, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";

const ApplyTeacher = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-teacher",
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
        message.success("application sent to the principal");
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
  return (
    <Layout>
      {/* <h1 className="text-center text-2xl mb-3 font-bold text-[#DDE7EE]">Apply Teacher</h1> */}
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="text-lg mb-3 pt-4 font-bold text-[#DDE7EE]">
          Personal Details :{" "}
        </h4>
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
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
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
                  Phone No
                </span>
              }
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your contact no"
                className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
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
            <Form.Item
              label={
                <span className="text-base font-bold text-[#DDE7EE]">
                  Website
                </span>
              }
              name="website"
            >
              <Input
                type="text"
                placeholder="your website"
                className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
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
                placeholder="your  address"
                className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
              />
            </Form.Item>
          </Col>
        </Row>
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

          <Col xs={24} md={24} lg={8} className="text-center mt-4"></Col>
        </Row>
        <button
          className="btn btn-primary form-btn bg-blue-500 ml-[32rem]"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </Layout>
  );
};

export default ApplyTeacher;
