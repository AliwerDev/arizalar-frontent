import { message } from "antd";
import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getMethodAxios, tokenName } from "./api";
import SignIn from "./containers/Auth/SignIn";
import SignUp from "./containers/Auth/SignUp";
import Home from "./containers/Home";
import Applications from "./pages/applications";
import CreateApplication from "./pages/create";
import Profile from "./pages/profile";
import Services from "./pages/services";
import Users from "./pages/users";
import { setUserAction } from "./redux/actions/userActions";

function App() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const userData = useSelector((state: RootStateOrAny) => state.user.user);

  const getUserData = async () => {
    setLoading(true);
    const token = localStorage.getItem(tokenName);
    if (token) {
      const res = await getMethodAxios("auth/me");
      if (res.success) {
        setUserAction(res.data);
        setIsSignIn(true);
      } else {
        localStorage.removeItem(tokenName);
        setIsSignIn(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData.id) {
      setIsSignIn(true);
    }
  }, [userData]);

  return (
    <>
      {contextHolder}
      {loading ? (
        <div className="loader__main">
          <div className="lds-hourglass" />
        </div>
      ) : (
        <Routes>
          <Route
            path="*"
            element={<Navigate to={isSignIn ? "profile" : "signin"} />}
          />
          <Route path="/signin" element={<SignIn setSignIn={setIsSignIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/application/:serviceId"
            element={<CreateApplication messageApi={messageApi} />}
          />
          {isSignIn && (
            <>
              <Route path="/profile" element={<Home isSignIn={isSignIn} />}>
                <Route path="" element={<Profile />} />
                <Route
                  path="services"
                  element={<Services messageApi={messageApi} />}
                />
                <Route path="services/:id" element={<Applications />} />
                <Route path="users" element={<Users />} />
              </Route>
            </>
          )}
        </Routes>
      )}
    </>
  );
}

export default App;
