import React from "react";
import { Card, Table, Button, Space } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const OrderHistoryPage = () => {
  // Sample data for the table (you can replace this with dynamic data)
  const data = [
    {
      key: "1",
      orderId: "ORD12345",
      customer: "John Doe",
      date: "2025-01-06",
      amount: "$150.00",
    },
    {
      key: "2",
      orderId: "ORD12346",
      customer: "Jane Smith",
      date: "2025-01-05",
      amount: "$200.00",
    },
    // Add more rows here as needed
  ];

  // Define columns for the table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small">
            View
          </Button>
          <Button type="link" size="small">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* Card component for wrapping the page content */}
      <Card
        title="Order History"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            New Order
          </Button>
        }
        style={{ marginBottom: "20px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Button
            type="default"
            icon={<SearchOutlined />}
            style={{ marginRight: "10px" }}
          >
            Search Orders
          </Button>
          <Button type="default">Filters</Button>
        </div>

        {/* Table displaying order history */}
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default OrderHistoryPage;
