import * as S from "./styles";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import { registerAction } from "../../redux/actions";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [registerForm] = Form.useForm();
  const { registerData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (registerData.error) {
      registerForm.setFields([
        {
          name: "email",
          errors: [registerData.error],
        },
      ]);
    }
  }, [registerData.error]);

  const handleRegister = (values) => {
    dispatch(
      registerAction({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          role: "user",
        },

        callback: () => navigate(ROUTES.LOGIN),
      })
    );
    notification.success({
      message: "Đăng kí thành công!",
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  };
  if (accessToken) {
    return <Navigate to={ROUTES.USER.HOME} />;
  }
  return (
    <S.RegisterWrapper>
      <S.RegisterContainer>
        <h3>Đăng kí</h3>
        <Form
          form={registerForm}
          name="registerForm"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => handleRegister(values)}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Email khong dung dinh dang!",
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
            label="Confirm Password"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Password is not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Đăng kí
            </Button>
          </Form.Item>
        </Form>
        <h5 className="register-yet">
          <span>Đã có tài khoản? </span>
          <Link to={ROUTES.LOGIN}>
            <i>
              <u>Đăng nhập ngay</u>
            </i>
          </Link>
        </h5>
      </S.RegisterContainer>
    </S.RegisterWrapper>
  );
}

export default RegisterPage;
