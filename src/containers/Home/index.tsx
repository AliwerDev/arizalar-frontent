import { FC } from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

interface IProps {
  isSignIn: boolean;
}

const Home: FC<IProps> = ({ isSignIn }) => {

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default Home;
