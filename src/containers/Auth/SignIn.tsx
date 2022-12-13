import { Box, Button, Input, Zoom } from "@mui/material";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignInDataType } from "../../components/types";
import { MainButton } from "./SignUp";
import { Link, useNavigate } from "react-router-dom";
import { signInAxios } from "../../api";
import { useState } from "react";
import { message } from "antd";

const SignInData: {
  name: string;
  value: string;
  type: string;
  actions: object;
}[] = [
  {
    name: "username",
    value: "Username",
    type: "text",
    actions: { required: true },
  },
  {
    name: "password",
    value: "Password",
    type: "password",
    actions: { required: true },
  },
];

const SignIn = ({ setSignIn }: { setSignIn: any }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDataType>();

  const onSubmit: SubmitHandler<SignInDataType> = async (data) => {
    setLoading(true);
    const res = await signInAxios(data);

    setSignIn(res.success);

    if (res.success) {
      navigate("/");
      setError(false);
    } else {
      setError(true);
      messageApi.open({
        type: "error",
        content: "username or password incorrect!",
        duration: 2,
      });
    }
    setLoading(false);
  };
  return (
    <LoginWrapper>
      {contextHolder}
      <div className="form-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={"title"}>
            Sign In {loading && <span className="loader" />}
          </p>
          {SignInData.map((item, i) => (
            <div key={item.name}>
              <Input
                sx={MainButton}
                placeholder={item.value}
                disableUnderline
                type={item.type || "text"}
                {...register(item.name as any, { ...item.actions })}
              />
              <p
                style={{
                  display: item.name in errors ? "block" : "none",
                  marginTop: 0,
                  fontSize: "14px",
                  color: "red",
                  textAlign: "end",
                }}
              >
                {item.value} is required
              </p>
            </div>
          ))}
          <Button variant="contained" type={"submit"}>
            Submit
          </Button>
          <Zoom in={error}>
            <Box></Box>
          </Zoom>
          <p className="link">
            Not accaunt? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </form>
      </div>
    </LoginWrapper>
  );
};

export const LoginWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 20px;
  align-items: center;
  .form-box {
    width: 400px;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      text-align: center;
      display: flex;
      align-items: center;
    }
    button {
      margin: 20px 0;
      display: block;
      width: 100%;
    }
  }
  .link {
    text-align: right;
    font-size: 14px;
  }

  .loader {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .loader:after {
    content: " ";
    display: block;
    width: 16px;
    margin-left: 10px;
    height: 16px;
    border-radius: 50%;
    border: 3px solid #00fbff;
    border-color: #00fbff transparent #00fbff transparent;
    animation: loading 1.2s linear infinite;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default SignIn;
