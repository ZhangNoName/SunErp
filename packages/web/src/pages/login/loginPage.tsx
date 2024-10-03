import { FC, useEffect, useState } from "react";
import "./loginPage.css";
import { Button, Form, Input, message, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = ({}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"signIn" | "signUp">("signIn");
  const signIn = () => {
    setLoading(true);
    form
      .validateFields()
      .then(async (res) => {
        console.log("登录表单校验", res);
        if (res.username == "admin" && res.password == "123456") {
          message.success("登录成功！");
          navigate("/home");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signUp = () => {
    message.info("请联系管理员添加账号！");
  };
  useEffect(() => {
    form.resetFields();
  }, [step]);
  const LoginDom = (
    <div className="login-content">
      <div className="title">登录</div>
      <div className="form">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="账号"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input className="input" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password
              className="input"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Form>
        <Button id="login-btn" className="btn" type="primary" onClick={signIn}>
          登录
        </Button>
        <div className="tip">
          <Button
            type="link"
            className="ai"
            onClick={() => message.warning("请联系管理员找回密码！")}
          >
            忘记密码
          </Button>
          <Button type="link" className="ai" onClick={() => setStep("signUp")}>
            注册
          </Button>
        </div>
      </div>
      <div className="footer">简简单单的收银系统</div>
    </div>
  );

  const SignUpDom = (
    <div className="sign-up-content">
      <div className="title">注册</div>
      <div className="form">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="昵称"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input className="input" autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="email"
            label="账号"
            rules={[
              { required: true, message: "请输入账号号!" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input className="input" autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: "请输入密码!" },
              {
                type: "string",
                min: 8,
                max: 50,
                message: "密码长度在8-50位之间!",
              },
            ]}
          >
            <Input.Password
              className="input"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="confirm password"
            label="确认密码"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请确认密码!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码不相同!"));
                },
              }),
            ]}
          >
            <Input.Password
              className="input"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              autoComplete="off"
            />
          </Form.Item>
        </Form>
        <Button className="btn" type="primary" onClick={signUp}>
          注册
        </Button>
      </div>
      <div className="footer">
        <div className="tip" onClick={() => setStep("signIn")}>
          已有帐户? 登录
        </div>
      </div>
    </div>
  );

  return (
    <div className="login-page-container">
      <Spin spinning={loading}>{step == "signIn" ? LoginDom : SignUpDom}</Spin>
    </div>
  );
};

export default LoginPage;
