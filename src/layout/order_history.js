import React, { useState } from "react";
import { Card, Table, Button, Space, Tag, message } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const OrderHistoryPage = () => {
  // State to manage the order data
  const [orders, setOrders] = useState([
    {
      key: "1",
      orderId: "ORD12345",
      customer: "John Doe",
      date: "2025-01-06",
      payment: "Pending",
      amount: "$150.00",
    },
    {
      key: "2",
      orderId: "ORD12346",
      customer: "Jane Smith",
      date: "2025-01-05",
      payment: "Completed",
      amount: "$200.00",
    },
    {
      key: "3",
      orderId: "ORD12347",
      customer: "Alice Johnson",
      date: "2025-01-04",
      payment: "Failed",
      amount: "$120.00",
    },
  ]);

  // Function to cycle through payment statuses
  const togglePaymentStatus = (key) => {
    const updatedOrders = orders.map((order) => {
      if (order.key === key) {
        const nextStatus =
          order.payment === "Pending"
            ? "Completed"
            : order.payment === "Completed"
            ? "Failed"
            : "Pending";
        return { ...order, payment: nextStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  // Function to delete an order
  const deleteOrder = (key) => {
    const updatedOrders = orders.filter((order) => order.key !== key);
    setOrders(updatedOrders);
    message.success("Order deleted successfully!");
  };

  // Function to handle edit (example logic, you can expand it as needed)
  const editOrder = (key) => {
    message.info(`Editing order with key: ${key}`);
    // Implement edit logic here, e.g., showing a modal with a form
  };

  // Function to handle view (example logic)
  const viewOrder = (key) => {
    message.info(`Viewing order with key: ${key}`);
    // Implement view logic here, e.g., showing a modal or redirecting to a details page
  };

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
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let color = "";
        if (record.payment === "Pending") color = "orange";
        else if (record.payment === "Completed") color = "green";
        else if (record.payment === "Canceled") color = "red";

        return (
          <Button
            style={{
              border: ` ${color}`,
              backgroundColor: color === "orange" ? "#fff7e6" : color === "green" ? "#f6ffed" : "#fff1f0",
              color: color,
            }}
            size="small"
            onClick={() => togglePaymentStatus(record.key)}
          >
            {record.payment}
          </Button>
        );
      },
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
          <Button type="link" size="small" onClick={() => viewOrder(record.key)}>
            View
          </Button>
          <Button type="link" size="small" onClick={() => editOrder(record.key)}>
            Edit
          </Button>
          <Button
            type="link"
            size="small"
            danger
            onClick={() => deleteOrder(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
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

        <Table
          columns={columns}
          dataSource={orders}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default OrderHistoryPage;
