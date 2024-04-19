import React, { useState } from "react";

import { Form, Input, Button, message } from "antd";

import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import AuthService from "./AuthService";
import styles from "./LoginForm.module.scss";

import { Typography } from "antd";

const { Title } = Typography;

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = async (values: any) => {
    try {
      const { email, password } = values;
      const response = await AuthService.login(email, password);

      // Assume the login is successful, and we have a token
      localStorage.setItem("token", response.token);
      message.success("Login successful!");

      // You can redirect the user or perform other actions upon successful login
    } catch (error) {
      message.error("Login failed. Check your credentials.");
    }
  };

  return (
    <div className={styles.section}>
      <Title level={2} className={styles.title}>
        Login Page
      </Title>

      <Form
        name="loginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="login-form"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            {
              type: "email",
              message: "Invalid email format",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            suffix={
              <span onClick={togglePasswordVisibility}>
                {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
              </span>
            }
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.logbtn}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
