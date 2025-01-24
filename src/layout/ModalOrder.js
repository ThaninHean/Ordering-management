import React, { useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Modal,
  Upload,
} from "antd";

const { Option } = Select;

const ModalPage = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    // You can add form submission logic here if needed
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
      </Button>
      <Modal
        title=""
        width={720}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button  key="cancel" type="primary" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      > 
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Tile"
                label="title"
                rules={[
                  {
                    required: true,
                    message: "Please enter title",
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                name="file"
                label="Url"
                rules={[
                  {
                    required: true,
                    message: "Please enter url",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item
                name="file"
                label="File"
                rules={[
                  {
                    required: true,
                    message: "Please upload a file",
                  },
                ]}
              >
                <Upload
                  name="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  beforeUpload={() => false} // Prevent automatic upload
                >
                  <Button icon={<UploadOutlined />} type="primary">
                    {" "}
                    Upload{" "}
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="author"
                label="author"
                rules={[
                  {
                    required: true,
                    message: "Please select an author",
                  },
                ]}
              >
                <Input placeholder="author"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: "Please choose the category",
                  },
                ]}
              >
                <Select placeholder="Please choose the category">
                  <Option value="Apple">App</Option>
                  <Option value="Samsung">Samsung</Option>
                  <Option value="Oppo">Oppo</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please choose the Gender",
                  },
                ]}
              >
                <Select placeholder="Please choose the gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* {date Time } */}
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="Date"
                rules={[
                  {
                    required: true,
                    message: "Please choose the date",
                  },
                ]}
              >
                <DatePicker
                  style={{
                    width: "100%",
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
            <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item> 
            </Col>

          </Row>
          <Row gutter={16}>
            <col span={24}>
            </col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalPage;
