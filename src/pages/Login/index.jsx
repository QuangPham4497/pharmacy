import * as S from "./styles";

import { Button, Checkbox, Form, Input, notification } from "antd";
import { SmileOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";
import { loginAction } from "../../redux/actions";

function LoginPage() {
  const [loginForm] = Form.useForm();
  const { loginData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [""],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ]);
    }
  });

  const handleLogin = (values) => {
    dispatch(
      loginAction({
        data: {
          email: values.email,
          password: values.password,
        },
        callback: (role) =>
          navigate(
            role === "admin" ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.HOME
          ),
      })
    );
    // notification.success({
    //   message: "Đăng nhập thành công!",
    //   icon: (
    //     <SmileOutlined
    //       style={{
    //         color: "#108ee9",
    //       }}
    //     />
    //   ),
    // });
  };

  if (accessToken) return <Navigate to={ROUTES.USER.HOME} />;

  return (
    <S.LoginWrapper>
      <S.LoginContainer>
        <h3>Đăng nhập</h3>
        <Form
          form={loginForm}
          name="loginForm"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => handleLogin(values)}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <h5 className="register-yet">
          <span>Chưa có tài khoản? </span>
          <Link to={ROUTES.REGISTER}>
            <i>
              <u>Đăng kí ngay</u>
            </i>
          </Link>
        </h5>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            type="primary"
            ghost
            onClick={() => navigate(ROUTES.USER.HOME)}
          >
            <ArrowLeftOutlined />
          </Button>
        </div>
      </S.LoginContainer>
    </S.LoginWrapper>
  );
}

export default LoginPage;
