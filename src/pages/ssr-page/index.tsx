import { GetServerSideProps } from "next";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";
import { Checkbox, Form, Input, Button } from "antd";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const TodoPage = ({ respData }: { respData: Todo[] }) => {
  const [todos, setTodos] = useState<Todo[]>(respData);
  const [form] = Form.useForm();

  const handleCheckboxChange = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const onFinish = async (values: any) => {
    try {
      console.log("Form values:", values);

      // Example: Submitting form data to a server using axios
      const response = await axios.post("your-server-endpoint", values);
      console.log("Form submission successful:", response.data);

      // Optionally, you can update the UI or perform any other actions after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);

      // Handle errors, display error messages, etc.
    }
  };

  return (
    <main>
      <Head>
        <title>Server Side Page</title>
      </Head>
      <h1>SSR Page</h1>
      {todos.length > 0 ? (
        <ol>
          {todos.map((todo: Todo) => (
            <li key={todo.id}>
              <Checkbox
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <span>
                {todo.title} - {todo.completed ? "Completed" : "Incomplete"}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        "Loading..."
      )}

      <Form form={form} onFinish={onFinish}>
        <Form.Item name="field1" label="Field 1">
          <Input />
        </Form.Item>
        <Form.Item name="field2" label="Field 2">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default TodoPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const todos: Todo[] = response.data;

    return {
      props: {
        respData: todos,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        respData: [],
      },
    };
  }
};
