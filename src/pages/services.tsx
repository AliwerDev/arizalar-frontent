import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getMethodAxios, postMethodAxios } from "../api";
import { Button, Divider, Form, Input, Modal, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const Styled = styled.div`
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
  }
  .d-none {
    display: none;
  }
`;

type IState = {
  services: any[];
  loading: boolean;
  error: any;
  user: any;
};

const Services = ({ messageApi }: { messageApi: any }) => {
  const [{ services }, setState] = useState<IState>({
    services: [],
    loading: false,
    error: null,
    user: null,
  });
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Hizmat nomi",
      dataIndex: "name",
      key: "name",
      render: (name: string, row: any) => {
        return (
          <>
            <Typography.Link onClick={() => navigate(row._id)}>
              {name}
            </Typography.Link>
          </>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Copy iframe",
      key: "action",
      render: (name: any, row: any) => {
        return (
          <span>
            <Typography.Title
              level={5}
              copyable={{
                text: ` <iframe className="application__sender" src="http://arizalar-frontent.vercel.app/application/${row._id}"></iframe>`,
              }}
            >
              Iframe
            </Typography.Title>
          </span>
        );
      },
    },
    {
      title: "Copy service api",
      key: "action",
      render: (name: any, row: any) => {
        return (
          <span>
            <Typography.Title
              level={5}
              copyable={{
                text: `http://arizalar-backend.vercel.app/application/${row._id}`,
              }}
            >
              api
            </Typography.Title>
          </span>
        );
      },
    },
  ];

  const getServices = async () => {
    try {
      const res = await getMethodAxios("/service");
      setState((s) => ({ ...s, services: res.data }));
    } catch (err) {}
  };
  const onFinish = async (values: any) => {
    try {
      const res = await postMethodAxios("/service", values);
      setState((s) => ({ ...s, services: [...s.services, res.data] }));
      setOpenModal(false);
      messageApi.success("successfully created service");
      form.resetFields();
    } catch (err) {
      messageApi.error("something went wrong");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    getServices();
  }, []);
  return (
    <Styled>
      <div className="header">
        <Typography.Title level={3}>Hizmatlar</Typography.Title>
        <Button onClick={() => setOpenModal(true)} type="primary">
          Hizmat qo'shish
        </Button>
      </div>
      <Table dataSource={services} rowKey="_id" columns={columns} />

      <Modal
        closable={false}
        maskClosable={false}
        onCancel={() => {
          form.resetFields();
          setOpenModal(false);
        }}
        open={openModal}
        onOk={() => {
          form.submit();
        }}
      >
        <Typography>Hizmat yaratish</Typography>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Hizmat nomi"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </Styled>
  );
};

export default Services;
