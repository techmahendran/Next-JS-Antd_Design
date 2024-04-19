import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input } from "antd";
import type { TableColumnsType } from "antd";
import styles from "./crud.module.scss";

import Head from "next/head";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const initialValues = {
  name: "", // Set the default value as an empty string
  // Add other fields and their default values if needed
};

const CRUDPage: React.FC = () => {
  const [data, setData] = useState<DataType[]>([
    // {
    //   key: "1",
    //   name: "John Doe",
    //   age: 24,
    //   address: "New York No. 1 Lake Park",
    // },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem("tableData");

    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage when 'data' changes
    localStorage.setItem("tableData", JSON.stringify(data));
  }, [data]);

  const columns: TableColumnsType<DataType> = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Age",
      dataIndex: "age",
    },
    {
      key: "3",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "actions",
      title: "Actions",
      render: (_text: string, record: DataType) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (formData) {
        // Edit existing data
        setData((prevData) =>
          prevData.map((item) =>
            item.key === formData.key ? { ...item, ...values } : item
          )
        );
        console.log(data);
      } else {
        // Add new data
        setData((prevData) => [
          ...prevData,
          { key: Date.now().toString(), ...values },
        ]);
      }

      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleEdit = (record: any) => {
    form.setFieldsValue(record); // Set form fields with the values of the selected record
    setFormData(record);

    setIsModalVisible(true);
  };

  const handleDelete = (record: DataType) => {
    setData((prevData) => prevData.filter((item) => item.key !== record.key));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
    setFormData(null);
  };

  return (
    <>
      <Head>
        <title>CRUD Operation</title>
      </Head>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>CRUD Operation</h1>
      <div className={styles.addbtn}>
        <Button type="primary" onClick={showModal}>
          Add Data
        </Button>
      </div>

      <Table columns={columns} dataSource={data} pagination={false} />

      <Modal
        title={formData ? "Edit Data" : "Add Data"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            {formData ? "Save Changes" : "Add"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={handleOk}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={initialValues}
        >
          <Form.Item label="Name" name="name">
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item label="Age" name="age">
            <Input type="number" autoComplete="off" />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input autoComplete="off" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CRUDPage;
