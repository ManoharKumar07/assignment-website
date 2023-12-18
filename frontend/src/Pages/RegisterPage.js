import React from "react";
import { Form, Input, message } from "antd";
import "../Styles/RegisterPageStyles.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="formbox">
        <div className="form-container">
          <Form
            layout="vertical"
            className="formw bg-[#32384E]"
            onFinish={onfinishHandler}
          >
            <h1 className="mb-4 text-2xl font-medium text-white">
              Register Form
            </h1>
            <Form.Item
              label={
                <span className="text-base font-bold text-[#DDE7EE]">Name</span>
              }
              name="name"
            >
              <Input
                type="text"
                required
                className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-base font-bold text-[#DDE7EE]">
                  Email
                </span>
              }
              name="email"
            >
              <Input
                type="email"
                required
                className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-base font-bold text-[#DDE7EE]">
                  Password
                </span>
              }
              name="password"
            >
              <Input
                type="password"
                required
                className="input input-bordered text-gray-200 input-primary w-full hello max-w-xs "
              />
            </Form.Item>
            <Link to="/login">
              <p className="text-blue-700"> Already user login here?</p>
            </Link>
            <br />
            <button className="btn btn-primary bg-blue-500" type="submit">
              Register
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
