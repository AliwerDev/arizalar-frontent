import { Box, Button, Input, Zoom } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginWrapper } from "./SignIn";
import { SignUpDataType } from "../../components/types";
import { Link, useNavigate } from "react-router-dom";
import { setUserAction } from "../../redux/actions/userActions";
import { signUpAxios } from "../../api";
import { useState } from "react";

export const MainButton = {
  mb: 1,
  padding: "6px 12px",
  width: "100%",
  background: "#fafafa",
  borderRadius: "5px",
  border: "1px solid #e6e6e6",
};

const SignUpData: {
  name: string;
  value: string;
  type: string;
  actions: object;
}[] = [
  {
    name: "fullName",
    value: "Full Name",
    type: "text",
    actions: { required: true },
  },
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

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDataType>();

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const signup = async (data: SignUpDataType) => {
    setLoading(true);
    const res = await signUpAxios(data);
    if (res.data) {
      navigate("/");
      setError(false);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const onSubmit: SubmitHandler<SignUpDataType> = (data) => {
    signup(data);
    setUserAction(data);
  };
  return (
    <LoginWrapper>
      <div className="form-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={"title"}>
            Sign Up {loading && <span className="loader" />}
          </p>
          {SignUpData.map((item, i) => (
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
            Have accaunt? <Link to={"/signin"}>Sign In</Link>
          </p>
        </form>
      </div>
    </LoginWrapper>
  );
};

export default SignUp;
