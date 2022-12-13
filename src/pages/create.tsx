import { PhoneFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { get } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { postMethodAxios } from "../api";

const StyledApplication = styled.div`
  padding: 40px;
  border-radius: 8px;

  .phone-input {
    width: 100%;
  }

  .wrapper {
    max-width: 600px;
    border-radius: 10px;
    background: #ebf0ef;
    margin: 0 auto;
    padding: 20px;
  }
`;

const CreateApplication = ({ messageApi }: any) => {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const res = await postMethodAxios(
      `/application/${get(params, "serviceId")}`,
      values
    );
    if (res.success) {
      messageApi.success("Arizangiz muvaffaqqiyatli yuborildi!");
      navigate("/");
      form.resetFields();
    } else {
      messageApi.error(res.message || "Something went wrong");
    }
    // messageApi.success("successfully created service");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyledApplication>
      <div className="wrapper">
        <Typography.Title level={4}>Arizangizni qoldiring</Typography.Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Ariza sarlavhasi"
            rules={[{ required: true, message: "Please input your title!" }]}
            name={"title"}
            tooltip="This is a required field"
          >
            <Input placeholder="sarlavha" />
          </Form.Item>
          <Form.Item
            label="Ariza matni"
            name="text"
            rules={[{ required: true, message: "Please input your text!" }]}
            tooltip={{
              title: "Arizangiz uchun matn kiriting",
            }}
          >
            <Input.TextArea
              autoSize={{ minRows: 5, maxRows: 15 }}
              placeholder="matn"
            />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Ismingiz"
                rules={[{ required: true, message: "Please input your name!" }]}
                name={"ownerName"}
                tooltip="This is a required field"
              >
                <Input placeholder="ismingizni kiriting" />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item
                label="Telefon raqamingiz"
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}
                name={"phoneNumber"}
                tooltip="This is a required field"
              >
                <Input
                  className="phone-input"
                  prefix={<PhoneFilled />}
                  placeholder="telefon raqamingizni kiriting"
                />
              </Form.Item>
            </Col>
          </Row>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </div>
    </StyledApplication>
  );
};

export default CreateApplication;
