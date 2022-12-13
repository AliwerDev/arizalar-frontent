import { Table, Typography } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMethodAxios } from "../api";
const Styled = styled.div`
  padding: 20px;
`;

type IState = {
  users: any[];
  loading: boolean;
  error: any;
  user: any;
};

const Users = () => {
  const [{ users }, setState] = useState<IState>({
    users: [],
    loading: false,
    error: null,
    user: null,
  });

  const columns = [
    {
      title: "Foydalanuvchi nome",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "To'liq ismi",
      dataIndex: "fullName",
      key: "fullName",
    },
  ];

  const getUsers = async () => {
    try {
      const res = await getMethodAxios("/auth/users");
      setState((s) => ({ ...s, users: res.data }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Styled>
      <Typography.Title level={3}>Foydalanuvchilar</Typography.Title>
      <Table dataSource={users} rowKey="_id" columns={columns} />
    </Styled>
  );
};

export default Users;
