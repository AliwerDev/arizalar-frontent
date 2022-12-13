import { Button, Divider, Table, Typography } from "antd";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMethodAxios } from "../api";

const Styled = styled.div`
  padding: 15px;
  .description {
    margin-bottom: 10px;
    display: inline-block;
  }

  .application__sender {
    min-width: 100%;
    min-height: 500px;
  }
`;

type IState = {
  applications: any[];
  loading: boolean;
  error: any;
  name: string;
  description: string;
  user: any;
};

const Applications = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [{ applications, name, description, loading }, setState] =
    useState<IState>({
      applications: [],
      name: "",
      description: "",
      loading: false,
      error: null,
      user: null,
    });

  const columns = [
    {
      title: "Ariza sarlavhasi",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ariza matni",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Arizachi ismi",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    {
      title: "Telefon raqami",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <span>
          <Button type="dashed" color="volcano">
            Edit
          </Button>
          <Divider type="vertical" />
          <Button type="dashed" color="error">
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const getApplications = async () => {
    setState((s) => ({ ...s, loading: true }));
    const { data } = await getMethodAxios(`/service/${get(params, "id")}`);
    if (data) {
      setState((s) => ({ ...s, ...data, loading: false }));
    } else {
      setState((s) => ({ ...s, loading: false }));
      navigate("/profile/services");
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  if (loading) return <></>;

  return (
    <Styled>
      <Typography.Title level={3}>{name}</Typography.Title>
      <Typography.Text className="description">{description}</Typography.Text>

      <Table dataSource={applications} rowKey="_id" columns={columns} />
      <iframe
        className="application__sender"
        src="http://localhost:3000/application/63976a7d12923590421bc182"
      ></iframe>
    </Styled>
  );
};

export default Applications;
