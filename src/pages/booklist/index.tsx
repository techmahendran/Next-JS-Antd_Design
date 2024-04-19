import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Space } from "antd";
import Header from "@/components/Header";
import styles from "./booklist.module.scss";
import Head from "next/head";

interface Book {
  key: string;
  title: string;
  author: string;
  isbn: number;
}

const BookListForm: React.FC<{ initialBooks: Book[] }> = ({}) => {
  // State variables
  const [form] = Form.useForm();
  const [books, setBooks] = useState<Book[]>([
    // {
    //   key: "1",
    //   title: "Default Book 1",
    //   author: "Default Author 1",
    //   isbn: 1234567890,
    // },
    // {
    //   key: "2",
    //   title: "Default Book 2",
    //   author: "Default Author 2",
    //   isbn: 9876543210,
    // },
  ]);
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(true);

  console.log(books);

  useEffect(() => {
    // Save books array to local storage whenever it changes
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Load books from local storage on component mount
  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  // Form submission handler
  const onFinish = (values: any) => {
    const newBook: Book = {
      key: String(books.length + 1),
      title: values.title,
      author: values.author,
      isbn: values.isbn,
    };

    setBooks([...books, newBook]);
    form.resetFields(); // Reset form fields after submitting
    setSubmitDisabled(true);
  };

  // Form values change handler
  const onValuesChange = (changedValues: any, allValues: any) => {
    // Check if all form fields are filled to enable/disable the submit button
    const hasEmptyField = Object.values(allValues).some((value: any) => !value);
    setSubmitDisabled(hasEmptyField);
  };

  // Delete book handler
  const handleDelete = (key: string) => {
    const updatedBooks = books.filter((book) => book.key !== key);
    setBooks(updatedBooks);
  };

  // Table columns
  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "ISBN #", dataIndex: "isbn", key: "isbn" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Book) => (
        <Space size="middle">
          <button onClick={() => handleDelete(record.key)}>Close</button>
        </Space>
      ),
    },
  ];

  // Component rendering
  return (
    <>
      {/* page title */}
      <Head>
        <title>BookList page</title>
      </Head>

      {/* Header */}
      <Header />
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        layout="inline"
        style={{ marginTop: 40 }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please enter the author" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ISBN #"
          name="isbn"
          rules={[{ required: true, message: "Please enter the ISBN #" }]}
        >
          <Input type="number" className={styles.arrowremove} />
        </Form.Item>

        {/* Add BookList btn */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.addbtn}
            disabled={isSubmitDisabled}
          >
            Add BookList
          </Button>
        </Form.Item>
      </Form>
      <Table
        className={styles.tablecontent}
        columns={columns}
        dataSource={books}
        style={{ marginTop: 40 }}
        pagination={false}
      >
        {/* Map over initial books and render Table.Column for each property */}
        {books.map((book) => (
          <Table.Column
            key={book.key}
            title={book.title}
            dataIndex={book.key}
          />
        ))}
      </Table>
    </>
  );
};

export default BookListForm;

// export async function getServerSideProps() {
//   // Fetch initial list of books from an API or database
//   const defaultBooks: Book[] = [
//     {
//       key: "1",
//       title: "Default Book 1",
//       author: "Default Author 1",
//       isbn: 1234567890,
//     },
//     {
//       key: "2",
//       title: "Default Book 2",
//       author: "Default Author 2",
//       isbn: 9876543210,
//     },
//   ];
//   // Pass fetched data as props
//   return { props: { initialBooks: defaultBooks } };
// }
