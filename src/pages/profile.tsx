import { Typography } from "antd";
import { get } from "lodash";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IUserReducer } from "../redux/types";

const ProfileStyele = styled.div`
  padding: 15px;
`;

const Profile = () => {
  const user = useSelector((state: IUserReducer) => state.user);
  console.log(user);
  return (
    <ProfileStyele>
      <Typography.Title level={3}>Profil</Typography.Title>

      <Typography.Title level={4}>
        Fullname: {get(user, "user.fullName")}
      </Typography.Title>
      <Typography.Title level={5}>
        Username: {get(user, "user.username")}
      </Typography.Title>
      <Typography.Title style={{ color: "volcano" }} level={5}>
        Role:{" "}
        <span style={{ textTransform: "uppercase" }}>
          {get(user, "user.role")}
        </span>
      </Typography.Title>
    </ProfileStyele>
  );
};

export default Profile;
