import React, { useEffect, useState } from "react";
import { Layout, Typography, Input, Button, List, Form, Modal } from "antd";
const { Title } = Typography;
import styles from "./todo.module.scss";
const { Content } = Layout;

// import { RiDeleteBin6Line } from "react-icons/ri";

import Head from "next/head";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  console.log(todos);

  const onFinish = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = {
        id: todos?.length + 1,
        text: newTodoText,
      };
      setTodos([...todos, newTodo]);
    }
    setNewTodoText("");
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todo");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const saveTodosToLocalStorage = (todos: { id: number; text: string }[]) => {
    localStorage.setItem("todo", JSON.stringify(todos));
  };

  const handleDelete = (id: number) => {
    setIsModalOpen(true);
    setDeleteId(id);
  };

  const handleOk = () => {
    if (deleteId !== null) {
      setTodos(todos.filter((todo) => todo.id !== deleteId));
      setDeleteId(null);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Todo Page</title>
      </Head>

      <Layout className={styles.todopage}>
        <Content style={{ padding: "50px", width: "40%" }}>
          <Title level={2} style={{ textAlign: "center" }}>
            TODO App
          </Title>

          <Form onFinish={onFinish}>
            <div className={styles.head}>
              <div style={{ width: "72%" }}>
                <Form.Item>
                  <Input
                    value={newTodoText}
                    className={styles.input}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    placeholder="Enter a new todo"
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginBottom: "10px", marginLeft: "10px" }}
                >
                  Add Todo
                </Button>
              </Form.Item>
            </div>
          </Form>

          {todos.map((todo) => (
            <div key={todo.id} className={styles.todolist}>
              <p>{`${todo.text}`}</p>
              <button
                className={styles.delbtn}
                onClick={() => handleDelete(todo.id)}
              >
                {/* <RiDeleteBin6Line /> */}
                Del
              </button>
            </div>
          ))}
          <Modal
            title="Todo List Modal"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Title level={4}>Are you sure the delete list</Title>
          </Modal>
        </Content>
      </Layout>
    </>
  );
};

export default TodoApp;
